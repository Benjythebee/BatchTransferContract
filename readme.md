# Batch transfer contract
This repository contains the local environment for a contract that allows sending ERC1155 items to multiple addresses.
It also allows sending an ERC721 to an address (although it is in the user's advantage to just call safeTransferFrom)
## Architecture
- contracts
- - batchTransfer.sol // batch transfer contract
- - multiToken.sol // an example erc1155 contract
- - token.sol  // an example erc721 contract
- test
- - BatchTransferContract.test.ts // tests for the batch transfer contract
- migrations
- - ... truffle migrations
## Install

1. Clone repo
2. Run `npm i` to install all necessary dependencies

`npm i` will then run `postinstall` and `generate-types`.

## Compile

Run `truffle compile`

- By default the compiler in truffle-config.js is `0.8.6`

## Test on truffle develop

run `truffle develop` followed by `migrate` and `test`

![image](https://user-images.githubusercontent.com/38708022/160931506-957b4b7c-725d-41f0-b63b-0ddd63e29abb.png)

Rinkeby contract: https://rinkeby.etherscan.io/address/0x3e3d923898bf5bbB0CB3Bd1809Dd10165918c990
Polygon contract: https://polygonscan.com/address/0x0c14093400f5de3de7326a9a7f49dcc53d6a9d0b
Ethereum contract: https://etherscan.io/address/0x9be54b221c44e8665c88af8bb1a99189a1f0e80a
## Test on local Network

Edit your local network in truffle-config.js under 'development'.

run `truffle test`
