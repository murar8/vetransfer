// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract VeTransfer {
  function transfer(address payable to) public payable {
    (bool sent, ) = to.call{ value: msg.value }("");
    require(sent, "Failed to send VET.");
  }
}
