const tokenAddr = ""; // <-- TODO: add token address here
const totalSupply = 10_000_000;
const addrs = [
  "" // TODO: add your DAO member addresses here!
]

async function main() {
  const token = await ethers.getContractAt("Token", tokenAddr);
  // sharing 50% of the voting power with these addreses
  const share = Math.floor((totalSupply - 5_000_000) / addrs.length);

  for(let i = 0; i < addrs.length; i++) {
    await token.transfer(addrs[i], ethers.utils.parseEther(share.toString()));
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
