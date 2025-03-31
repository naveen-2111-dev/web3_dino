// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleDinoToken is ERC20, Ownable {
    uint256 private constant TOTAL_SUPPLY = 1000000000 * 10 ** 18;

    constructor() ERC20("Simple Dino", "SDINO") Ownable(msg.sender) {
        _mint(address(this), TOTAL_SUPPLY);
        transferOwnership(msg.sender);
    }

    function sendTokens(address recipient, uint256 amount) external onlyOwner {
        require(
            balanceOf(address(this)) >= amount,
            "Not enough tokens in contract"
        );
        _transfer(address(this), recipient, amount);
    }
}
