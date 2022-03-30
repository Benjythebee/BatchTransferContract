const BatchTransferContract = artifacts.require("BatchTransferContract");

module.exports = function (deployer) {
  deployer.deploy(BatchTransferContract);
};
