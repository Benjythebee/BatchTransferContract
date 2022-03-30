# Batch transfer contract
This repository contains the local environment for a contract that allows sending ERC1155 items to multiple addresses.
It also allows sending an ERC721 to an address (although it is in the user's advantage to just call safeTransferFrom)
## Architecture
- contracts
- - batchTransfer.sol // batch transfer contract
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

## Test on local Network

Edit your local network in truffle-config.js under 'development'.

run `truffle test`
