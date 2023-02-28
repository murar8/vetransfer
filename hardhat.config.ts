import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@vechain.energy/hardhat-thor";

import { execSync } from "child_process";
import { HardhatUserConfig, task } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";

dotenv.config();

// Type definitions for @vechain.energy/hardhat-thor
declare module "hardhat/types/runtime" {
  interface HardhatRuntimeEnvironment {
    thor: HardhatEthersHelpers;
  }
}

task("format", "Format the codebase using Prettier.", async () => {
  execSync("prettier --ignore-path .gitignore --write .");
});

task("deploy", "Deploy the contract to VeChain.", async (args, hre) => {
  await hre.run("compile");

  const VeTransfer = await hre.thor.getContractFactory("VeTransfer");
  const veTransfer = await VeTransfer.deploy();
  await veTransfer.deployed();

  console.log(`VeTransfer deployed to '${veTransfer.address}'`);
});

const config: HardhatUserConfig = {
  solidity: "0.8.18",

  networks: {
    testnet: <NetworkUserConfig>{
      url: "https://testnet.veblocks.net",
      delegateUrl: "https://sponsor-testnet.vechain.energy/by/90",
      blockGasLimit: 10000000,
    },
    mainnet: <NetworkUserConfig>{
      url: "https://mainnet.veblocks.net",
      // delegateUrl: "https://sponsor.vechain.energy/by/15",
      privateKey: process.env.MAINNET_DEPLOY_PRIVATE_KEY,
      blockGasLimit: 10000000,
    },
  },
};

export default config;
