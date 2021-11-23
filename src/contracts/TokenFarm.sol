pragma solidity ^0.5.16;

import './DaiToken.sol';
import './BrunostToken.sol';

contract TokenFarm {
    
    string public name = "Tufoah Token Farm";
    address public owner;
    BrunostToken public brunostToken;
    DaiToken public daiToken;

    

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    address[] public stakers;

    constructor(BrunostToken _brunostToken, DaiToken _daiToken) public {
        brunostToken = _brunostToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    function stakeTokens(uint _amount) public {

        require(_amount > 0, "amount cannot be 0");

        daiToken.transferFrom(msg.sender,address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }

    function issueToken() public {
        require(msg.sender == owner, "caller must be the owner");

        for (uint i= 0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if (balance > 0) {
                brunostToken.transfer(recipient, balance);
            }
        }

    }

    function unstakeTokens() public {

        uint balance = stakingBalance[msg.sender];

        require(balance > 0, "staking balance cannot be 0");

        daiToken.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;

        isStaking[msg.sender] = false;
    }
}