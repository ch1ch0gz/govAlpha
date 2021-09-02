const hre = require("hardhat");

const govAlphaAddr = "0xABFed4507fE61155305718bbb94fD3fe214B13F3";

async function main() {
  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);
  await govAlpha.queue(1);
  // we set the delay to 0
  await govAlpha.execute(1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
