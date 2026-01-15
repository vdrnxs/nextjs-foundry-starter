// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title SimpleToken
/// @notice A basic ERC20-like token implementation for learning purposes
/// @dev This is a simplified token without full ERC20 standard compliance
contract SimpleToken {
    string public name = "Simple Token";
    string public symbol = "SIM";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /// @notice Contract constructor that mints initial supply to deployer
    constructor() {
        totalSupply = 1_000_000 * 10**decimals; // 1 million tokens
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    /// @notice Transfer tokens to a recipient
    /// @param to The recipient address
    /// @param amount The amount to transfer
    /// @return success True if transfer succeeded
    function transfer(address to, uint256 amount) public returns (bool success) {
        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }

    /// @notice Approve an address to spend tokens on your behalf
    /// @param spender The address authorized to spend
    /// @param amount The amount they can spend
    /// @return success True if approval succeeded
    function approve(address spender, uint256 amount) public returns (bool success) {
        require(spender != address(0), "Cannot approve zero address");

        allowance[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /// @notice Transfer tokens from one address to another using allowance
    /// @param from The address to transfer from
    /// @param to The recipient address
    /// @param amount The amount to transfer
    /// @return success True if transfer succeeded
    function transferFrom(address from, address to, uint256 amount) public returns (bool success) {
        require(from != address(0), "Cannot transfer from zero address");
        require(to != address(0), "Cannot transfer to zero address");
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");

        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;

        emit Transfer(from, to, amount);
        return true;
    }
}
