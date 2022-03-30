// import {expect,use,assert} from 'chai';
import { MultiTokenInstance,TokenInstance,BatchTransferContractInstance } from '../types/truffle-contracts';
import {} from 'mocha'
const BatchTransferContract = artifacts.require("BatchTransferContract")
const Token = artifacts.require("Token")
const MultiToken = artifacts.require("MultiToken")
const {
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
  time,         // Time manipulation
} = require('@openzeppelin/test-helpers');

contract("BatchTransferContract - tests",function (accounts) {

  const [wallet,walletTo,walletThree] = accounts
  let BatchTransfer:BatchTransferContractInstance
  let TokenContract:TokenInstance
  let MultiTokenContract:MultiTokenInstance
  beforeEach(async ()=>{
    BatchTransfer = await BatchTransferContract.deployed()
    TokenContract= await Token.deployed()
    MultiTokenContract= await MultiToken.deployed()
  })

  it('call isApproved - token - false', async () => {
    // mint all tokens
    await TokenContract.mint(wallet,1)
    await TokenContract.mint(wallet,2)
  
    await MultiTokenContract.mint(wallet,5)
    await MultiTokenContract.mint(wallet,20)

    expect((await BatchTransfer.isApprovedForAll(TokenContract.address))).to.be.false
  });

  it('call isApproved - MultiToken - false', async () => {
    expect((await BatchTransfer.isApprovedForAll(MultiTokenContract.address))).to.be.false
  });

  it('MultiTransfer- Multitoken - should revert', async () => {
    await expectRevert(BatchTransfer.batchTransfer_singleTokenToMultipleDest(MultiTokenContract.address,1,[walletTo,walletThree]),"Contract not approved")
  });

  it('call setApproved - MultiToken', async () => {
    await MultiTokenContract.setApprovalForAll(BatchTransfer.address,true)
    expect(await BatchTransfer.isApprovedForAll(MultiTokenContract.address)).to.be.true
  });

  it('MultiTransfer- Multitoken - should be ok', async () => {
    await BatchTransfer.batchTransfer_singleTokenToMultipleDest(MultiTokenContract.address,1,[walletTo,walletThree])

    expect((await MultiTokenContract.balanceOf(wallet,1)).toNumber()).to.be.equal(3)
  });

  // Token contract:
  
  it('MultiTransfer- Token - should revert', async () => {
    await expectRevert(BatchTransfer.batchTransfer_singleTokenToMultipleDest(TokenContract.address,1,[walletTo,walletThree]),"Contract not approved")
  });

  it('call setApproved - Token', async () => {
    await TokenContract.setApprovalForAll(BatchTransfer.address,true)
    expect(await BatchTransfer.isApprovedForAll(TokenContract.address)).to.be.true
  });

  it('MultiTransfer- Token - should revert', async () => {
    await expectRevert(BatchTransfer.batchTransfer_singleTokenToMultipleDest(TokenContract.address,1,[walletTo,walletThree]),"ERC721: Can't send one token to multiple addresses")
  });

  it('MultiTransfer- Token - should be ok', async () => {
    await BatchTransfer.batchTransfer_singleTokenToMultipleDest(TokenContract.address,1,[walletTo])

    expect((await TokenContract.balanceOf(walletTo)).toNumber()).to.be.equal(1)
  });

  // Check final balances

  it('Check All balances', async () => {
    expect((await TokenContract.balanceOf(walletTo)).toNumber()).to.be.equal(1)
    expect((await TokenContract.balanceOf(wallet)).toNumber()).to.be.equal(1)
    expect((await TokenContract.balanceOf(wallet)).toNumber()).to.be.equal(1)

    expect((await MultiTokenContract.balanceOf(walletTo,1)).toNumber()).to.be.equal(1)
    expect((await MultiTokenContract.balanceOf(walletThree,1)).toNumber()).to.be.equal(1)
    expect((await MultiTokenContract.balanceOf(wallet,1)).toNumber()).to.be.equal(3)
  });
})
