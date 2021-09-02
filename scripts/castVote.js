const hre = require("hardhat");

const govAlphaAddr = "0xABFed4507fE61155305718bbb94fD3fe214B13F3";

async function main() {
  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);
  await govAlpha.castVote(1, true);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
