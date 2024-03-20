// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require("@nomiclabs/hardhat-waffle");
const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");
const {  JsonRpcProvider } = require('ethers');


async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const HouseRealEstate = await hre.ethers.getContractFactory("HouseRealEstate");
  const houseRealEstate = await HouseRealEstate.deploy();

  await houseRealEstate.deployed();

 
  //console.log("Real Estate Contract Address : ", HouseRealEstate)

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('../HouseRealEstate.json', JSON.stringify(HouseRealEstate))





}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
