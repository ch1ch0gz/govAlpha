const hre = require("hardhat");

const govAlphaAddr = "0xABFed4507fE61155305718bbb94fD3fe214B13F3";
const tokenAddr = "0xE30a4B00e7197F47CE120a28208cC145a269aa49";

async function main() {
  const [addr1] = await ethers.provider.listAccounts();

  const token = await ethers.getContractAt("Token", tokenAddr);
  await token.delegate(addr1);

  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);
  await govAlpha.castVote(1, true);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
