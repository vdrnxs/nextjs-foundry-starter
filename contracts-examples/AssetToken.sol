// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title Asset Tokenization Contract (Example)
/// @notice Copy this to foundry/src/ after running `forge init foundry --no-git`
/// @dev Simplified ERC-1155-like contract for educational purposes
contract AssetToken {
    uint256 private _currentTokenId;

    struct Asset {
        string name;
        uint256 totalSupply;
        uint256 pricePerToken;
    }

    mapping(uint256 => Asset) public assets;
    mapping(uint256 => mapping(address => uint256)) public balances;

    address public owner;

    event AssetCreated(uint256 indexed tokenId, string name, uint256 totalSupply, uint256 pricePerToken);
    event AssetPurchased(uint256 indexed tokenId, address indexed buyer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Create a new tokenized asset
    function createAsset(
        string calldata name,
        uint256 totalSupply,
        uint256 pricePerToken
    ) external onlyOwner returns (uint256) {
        require(totalSupply > 0, "Supply must be greater than 0");

        uint256 tokenId = _currentTokenId++;

        assets[tokenId] = Asset({
            name: name,
            totalSupply: totalSupply,
            pricePerToken: pricePerToken
        });

        balances[tokenId][msg.sender] = totalSupply;

        emit AssetCreated(tokenId, name, totalSupply, pricePerToken);

        return tokenId;
    }

    /// @notice Purchase asset tokens
    function purchaseAsset(uint256 tokenId, uint256 amount) external payable {
        Asset storage asset = assets[tokenId];
        require(asset.totalSupply > 0, "Asset does not exist");
        require(amount > 0, "Amount must be greater than 0");
        require(balances[tokenId][owner] >= amount, "Insufficient tokens available");

        uint256 totalPrice = asset.pricePerToken * amount;
        require(msg.value >= totalPrice, "Insufficient payment");

        balances[tokenId][owner] -= amount;
        balances[tokenId][msg.sender] += amount;

        emit AssetPurchased(tokenId, msg.sender, amount);

        // Refund excess payment
        if (msg.value > totalPrice) {
            (bool success, ) = payable(msg.sender).call{value: msg.value - totalPrice}("");
            require(success, "Refund failed");
        }
    }

    /// @notice Get asset details
    function getAsset(uint256 tokenId) external view returns (Asset memory) {
        return assets[tokenId];
    }

    /// @notice Get balance of tokens
    function balanceOf(address account, uint256 tokenId) external view returns (uint256) {
        return balances[tokenId][account];
    }

    /// @notice Withdraw contract balance
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
}
