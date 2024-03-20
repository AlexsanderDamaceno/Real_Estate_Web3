require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');

require("dotenv").config();

const SEPOLIA_URL = process.env.SEPOLIO;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {

  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 1337
    },

  sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      
      
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};