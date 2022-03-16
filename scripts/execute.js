const govAlphaAddr = ""; // <-- TODO: add govAlpa address here

// first proposal starts at 1
const PROPOSAL_ID = 1;

async function main() {
  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);

  console.log("queueing the proposal...");
  const tx1 = await govAlpha.queue(PROPOSAL_ID);
  await tx1.wait();
  console.log(`https://rinkeby.etherscan.io/tx/${tx1.hash}`);
  
  // we set the timelock delay to 0 in the deploy script
  console.log("executing the proposal...");
  const tx2 = await govAlpha.execute(PROPOSAL_ID);
  await tx2.wait();
  console.log(`https://rinkeby.etherscan.io/tx/${tx2.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
