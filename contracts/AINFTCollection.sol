// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract AINFTCollection is ERC721A, Ownable, ERC2981, Pausable {
    uint256 public immutable maxSupply;
    uint256 public mintPrice;
    bool public publicMintEnabled;
    bool public whitelistMintEnabled;
    bool public revealed;

    string private baseTokenURI;
    string private hiddenTokenURI;

    mapping(address => bool) public whitelist;

    constructor(
        string memory collectionName,
        string memory symbol,
        uint256 supply,
        uint256 initialMintPrice,
        address royaltyReceiver,
        uint96 royaltyFee
    ) ERC721A(collectionName, symbol) Ownable(msg.sender) {
        maxSupply = supply;
        mintPrice = initialMintPrice;
        _setDefaultRoyalty(royaltyReceiver, royaltyFee);
    }

    function ownerMint(address to, uint256 quantity) external onlyOwner {
        require(totalSupply() + quantity <= maxSupply, "Max supply reached");
        _mint(to, quantity);
    }

    function whitelistMint(uint256 quantity) external payable whenNotPaused {
        require(whitelistMintEnabled, "Whitelist mint disabled");
        require(whitelist[msg.sender], "Not whitelisted");
        require(totalSupply() + quantity <= maxSupply, "Max supply reached");
        require(msg.value >= mintPrice * quantity, "Insufficient ETH");
        _mint(msg.sender, quantity);
    }

    function publicMint(uint256 quantity) external payable whenNotPaused {
        require(publicMintEnabled, "Public mint disabled");
        require(totalSupply() + quantity <= maxSupply, "Max supply reached");
        require(msg.value >= mintPrice * quantity, "Insufficient ETH");
        _mint(msg.sender, quantity);
    }

    function setWhitelist(address[] calldata users, bool value) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            whitelist[users[i]] = value;
        }
    }

    function setMintState(bool whitelistState, bool publicState) external onlyOwner {
        whitelistMintEnabled = whitelistState;
        publicMintEnabled = publicState;
    }

    function setBaseURI(string calldata uri) external onlyOwner {
        baseTokenURI = uri;
    }

    function setHiddenURI(string calldata uri) external onlyOwner {
        hiddenTokenURI = uri;
    }

    function setRevealed(bool value) external onlyOwner {
        revealed = value;
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function withdraw() external onlyOwner {
        (bool ok, ) = payable(owner()).call{value: address(this).balance}("");
        require(ok, "Transfer failed");
    }

    function _baseURI() internal view override returns (string memory) {
        if (!revealed) return hiddenTokenURI;
        return baseTokenURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
