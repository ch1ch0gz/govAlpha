const hre = require("hardhat");

const exampleAddr = "0x1492a02507Ab07F42e0Ad68Df2c201555334Dcb1";
const govAlphaAddr = "0xABFed4507fE61155305718bbb94fD3fe214B13F3";
const tokenAddr = "0xE30a4B00e7197F47CE120a28208cC145a269aa49";

async function main() {
  const [addr1] = await ethers.provider.listAccounts();
  const token = await ethers.getContractAt("Token", tokenAddr);
  await token.delegate(addr1);
  const example = await ethers.getContractAt("Example", exampleAddr);

  const targets = [exampleAddr];
  const values = ["0"];
  const signatures = [""];
  const calldatas = [example.interface.encodeFunctionData("changeMsg", ["Destroy All Humans!"])];
  const description = "Setting a new message!";

  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);
  const tx = await govAlpha.propose(targets, values, signatures, calldatas, description);
  const receipt = await tx.wait();

  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
