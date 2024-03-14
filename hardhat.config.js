require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },

    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/GKCCdAcLx7ckKFlMoZN2t_Z6kpLxsHXO",
      accounts: [ "70738577ee9907c614ce7a024d5330790a9ffc1839f2d81a910103107c9d2722" , "f2d5e99f51ab2ca2478851c9da5870c3315b823155a6d05a72da0b2e24923e11" ]
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