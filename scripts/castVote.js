const govAlphaAddr = ""; // <-- TODO: add govAlpha address here
const tokenAddr = ""; // <-- TODO: add token address here

// first proposal starts at 1
const PROPOSAL_ID = 1;

async function main() {
  const [addr1] = await ethers.provider.listAccounts();

  const token = await ethers.getContractAt("Token", tokenAddr);
  const tx1 = await token.delegate(addr1);
  await tx1.wait();

  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);

  const tx2 = await govAlpha.castVote(PROPOSAL_ID, true);
  await tx2.wait();

  console.log(`https://rinkeby.etherscan.io/tx/${tx.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
