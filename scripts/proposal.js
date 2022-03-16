const exampleAddr = ''; // <-- add example address here
const govAlphaAddr = ''; // <-- add governor alpha address here
const tokenAddr = ''; // <-- add token address

async function main() {
  const example = await ethers.getContractAt("Example", exampleAddr);

  const targets = [exampleAddr];
  const values = ["0"];
  const signatures = [""];
  const calldatas = [example.interface.encodeFunctionData("changeMsg", ["Destroy All Humans!"])];
  const description = "Setting a new message!";

  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);
  const tx = await govAlpha.propose(targets, values, signatures, calldatas, description);
  await tx.wait();
  
  console.log(`propose txn: https://rinkeby.etherscan.io/tx/${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
