//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract erc20Deployer1 is ERC20 {

  constructor() ERC20("testDAI", "testDAI") {
    _mint(msg.sender, 100000000 * 10 ** decimals());
  }

}

contract erc20Deployer2 is ERC20 {

  constructor() ERC20("testUSDT", "testUSDT") {
    _mint(msg.sender, 100000000 * 10 ** decimals());
  }

}