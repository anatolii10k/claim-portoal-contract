//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract NewPLEtoken is ERC20{
    constructor() ERC20('NewPLE','PLE'){

    }

    function faucet(address to, uint256 amount) external{
        _mint(to,amount);
    }
}





