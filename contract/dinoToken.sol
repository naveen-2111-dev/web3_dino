// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleDinoToken is ERC20 {
    uint256 private constant TOTAL_SUPPLY = 1000000000 * 10**18;
    
    constructor() ERC20("Simple Dino", "SDINO") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
}