const { assert } = require('chai')

const DaiToken = artifacts.require('DaiToken')
const BrunostToken = artifacts.require('BrunostToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai').use(require('chai-as-promised')).should()

function tokens(n) {
    return web3.utils.toWei(n,'ether')
}

contract('TokenFarm', ([owner, investor]) => {
    let daiToken, brunostToken, tokenFarm;

    before(async () => {
        daiToken = await DaiToken.new()
        brunostToken = await BrunostToken.new()
        tokenFarm = await TokenFarm.new(brunostToken.address, daiToken.address)

        await brunostToken.transfer(tokenFarm.address,tokens('1000000'))

        await daiToken.transfer(investor,tokens('100'), {from: owner })
    })
    
    describe('Mock Dai Deployment', async () => {
        it('has a name', async () => {

            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Brunost Token deployment', async () => {
        it('has a name', async () => {

            const name = await brunostToken.name()
            assert.equal(name, 'Brunost Token')
        })
    })

    describe('TokenFarm deployment', async () => {
        it('has a name', async () => {

            const name = await tokenFarm.name()
            assert.equal(name, 'Tufoah Token Farm')
        })

        it('contract has tokenss', async () => {
            let balance = await brunostToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('Farming tokens', async () => {

        it('Rewards investors for staking mDai tokens', async () => {
            let result

            result = await daiToken.balanceOf(investor);
            assert.equal(result.toString(), tokens('100'), 'Investor Mock DAI wallet balance correct before staking')

            await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor})
            await tokenFarm.stakeTokens(tokens('100'), { from: investor })

            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'Investor Mock DAI wallet balance correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('100'), 'Token farm Mock DAI wallet balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor staking balance correct after staking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'Investor staking status correct after staking')

            await tokenFarm.issueToken({ from: owner })

            result = await brunostToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor BOST token wallet balance correct after issueing')

            await tokenFarm.issueToken({ from: investor}).should.be.rejected;

            await tokenFarm.unstakeTokens({ from: investor })

            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'Investor Mock DAI wallet balance correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI wallet balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('0'), 'Investor staking balance correct after staking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'false', 'Investor staking status correct after staking')
        })
    })


})
