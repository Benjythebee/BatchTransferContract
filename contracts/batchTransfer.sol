//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IisApprovedForAll{
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}


contract BatchTransferContract {

    ///@dev id of ERC1155 interface
    bytes4 ERC1155_INTERFACE_ID = 0xd9b67a26;
    ///@dev id of ERC721 interface
    bytes4 ERC721_INTERFACE_ID = 0x80ac58cd;


    event BatchTransfer(address indexed _implementation,address indexed _from, uint256 indexed _tokenId,address[] _addrs);

    constructor() {
    }

    /**
    * @dev Name of the contract
    * @return name of contract
    */
    function name() pure public returns(string memory){
        return "Batch transfer Contract V1";
    }

    /**
    * @dev Checks if the contract is approved to transfer the user's NFTs
    * @notice once the contract is interacted with, the client is expected to unApprove this contract.
    * @return boolean
    */
    function isApprovedForAll(address _impl) public view returns(bool) {
        if(!ERC165Checker.supportsInterface(_impl,ERC1155_INTERFACE_ID) && !ERC165Checker.supportsInterface(_impl,ERC721_INTERFACE_ID)){
            return false;
        }
        return IisApprovedForAll(_impl).isApprovedForAll(msg.sender, address(this));
    }

    /**
    * @dev Checks the type of contract and transfers _tokenId to each _addr. If ERC1155, one item of one quantity is sent to each wallet, if ERC751
    * only one item is sent to one address.
    * @notice once the contract is interacted with, the client is expected to unApprove this contract.
    * @param _impl address of the NFT collection
    * @param _tokenId token id to transfer
    * @param _addrs Addresses to receive the NFT
    */
    function batchTransfer_singleTokenToMultipleDest(address _impl,uint256 _tokenId, address[] calldata _addrs) external {
        require(isApprovedForAll(_impl),"Contract not approved");

        if(ERC165Checker.supportsInterface(_impl,ERC721_INTERFACE_ID)){
            require(_addrs.length==1,"ERC721: Can't send one token to multiple addresses");
            IERC721(_impl).transferFrom(msg.sender, _addrs[0], _tokenId);
        }

        if(ERC165Checker.supportsInterface(_impl,ERC1155_INTERFACE_ID) ){
            for (uint256 i = 0; i <_addrs.length; i++) {
                IERC1155(_impl).safeTransferFrom(msg.sender, _addrs[i], _tokenId,1,'');
            }
        }

        emit BatchTransfer(_impl,msg.sender,_tokenId,_addrs);
    }

}
