# New Parcel contract
This repository contains the new contracts
## Architecture
- build
- - ... Compiled output of contracts by Truffle.
- contracts
- - parcels.sol // to be audited
- test
- - parcels.test.ts // tests for the new parcels contract
- migrations
- - ... truffle migrations
- docs
- - parcels.sol.md // markdown documentation about the `parcels.sol` contract
- old_parcels.sol // The old parcel contract (useful for reference) (to be ignored by auditors)
## Install

1. Clone repo
2. Run `npm i` to install all necessary dependencies

`npm i` will then run `postinstall` and `generate-types`.

## Compile

Run `truffle compile`

- By default the compiler in truffle-config.js is `0.8.6`

## Test on truffle develop

run `truffle develop` follow by `test`

## Test on local Network

Edit your local network in truffle-config.js under 'development'.

run `truffle test`
