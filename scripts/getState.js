const govAlphaAddr = "0x0c431da7185b7ff547e2ab76bc3dfa5475f3aa93"; // <-- TODO: add govAlpha address here

// first proposal starts at 1
const PROPOSAL_ID = 1;

async function main() {
  const govAlpha = await ethers.getContractAt("GovernorAlpha", govAlphaAddr);

  console.log("Proposal:", await govAlpha.proposals(PROPOSAL_ID));

  console.log("Proposal State:", await govAlpha.state(PROPOSAL_ID));
  console.log("See the ProposalState enum for the definition.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
