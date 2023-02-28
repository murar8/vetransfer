import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

async function deploy() {
  const [owner, other] = await ethers.getSigners();

  const VeTransfer = await ethers.getContractFactory("VeTransfer");
  const veTransfer = await VeTransfer.deploy();
  await veTransfer.deployed();

  return { veTransfer, owner, other };
}

it("should transfer the funds to the new owner", async () => {
  const { veTransfer, other } = await loadFixture(deploy);
  const amount = "1000000000000000000";

  const initialBalance = await other.getBalance();
  await veTransfer.transfer(other.address, { value: amount });
  const currentBalance = await other.getBalance();

  expect(initialBalance.add(amount)).to.equal(currentBalance);
});
