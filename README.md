# En liten Defi app for gøy

For å kjøre denne applikasjonen kreves det et par ting i forkant.

### Ganache

[Ganache](https://www.trufflesuite.com/ganache) er et utviklerverktøy for å kjøre en lokal Ethereum eller Corda blockchainnettverk. Denne må lastes ned og kjøres i bakgrunnen.

![Ganachebilde](https://github.com/tofiksa/cryptxchange/blob/main/docs/Ganache.png)

### Metamask
Det kreves at man også har installert en kryptovalutalommebok som f.eks [Metamask](https://metamask.io/) for å kunne overføre crypto mellom lommebok og applikasjonen. Dette er en plugin som man installerer på din nettleser. Sørg for å koble deg opp på ditt lokale nettverk der Ganache kjører
![Metamask](https://github.com/tofiksa/cryptxchange/blob/main/docs/Metamask.png)

Trykk på logen øverst til høyre hjørnet deretter Innstillinger -> Nettverk -> Legg til nettverk

![Metamask_del2](https://github.com/tofiksa/cryptxchange/blob/main/docs/Metamask_del2.png =250x250)


### Truffle

Truffle er tjenesten som binder react webappen med blockchainnettverket og legger eventuelle smartkontrakter i blockchainen. Konfigurasjon finnes i truffle-config.js

`module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" 
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',`

### Smartkontraktene

Smartkontraktene er skrevet i solidity og legges der man peker at de skal være i truffle-config.js filen. Etter at de kompileres med kommandoen `truffle compile` vil det bli generert abifiler der man definerer outputmappen. Dette er json filer som man kan bruke i webappen for å hente ut informasjon fra blockchainnettverket.

### Tester

Alle smartkontrakt testene kjøres med `truffle test`

### Installere og kjøre applikasjonen

`yarn install` for å installere alle pakkene og `yarn start` for å kjøre applikasjonen

### Hva gjør applikasjonen

Formålet med applikasjonen er å demonstrere såkalt [Yield farming](https://everipedia.org/wiki/lang_en/yield-farming), dvs, at man overfører cryptovalutaen DAI og får generert BrunostTokens(BOST) for hver DAI man legger inn. Etter man har lagt inn DAI så må man kjøre et script for å generere BrunostTokens(BOST) for hvor DAI man har lagt inn som en slags belønning.
`truffle exec src/scripts/issue-tokens.js`
Etter at man har refreshet siden (kan ta et par minutter), så vil man se at man har fått like mye antall BOST som det er blitt lagt inn av DAI.
