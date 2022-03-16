const govAlphaAddr = ""; // <-- TODO: add govAlpha address here

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