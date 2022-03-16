async function main() {
  [addr1] = await ethers.provider.listAccounts();

  console.log("starting the deployments...");

  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy(addr1);
  await token.deployed();

  console.log("token deployed!");

  const tx = await token.delegate(addr1);
  await tx.wait();

  console.log("self-delegated tokens!");

  const nonce = await ethers.provider.getTransactionCount(addr1);
  const govAlphaAddr = ethers.utils.getContractAddress({ from: addr1, nonce: nonce + 1 });

  // deploying the timelock with a 0 delay
  const Timelock = await ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy(govAlphaAddr, 0);
  await timelock.deployed();

  console.log("timelock deployed!");

  const GovernorAlpha = await ethers.getContractFactory("GovernorAlpha");
  govAlpha = await GovernorAlpha.deploy(timelock.address, token.address, addr1);
  await govAlpha.deployed();

  console.log("govalpha deployed!");

  const Example = await ethers.getContractFactory("Example");
  example = await Example.deploy(timelock.address);
  await example.deployed();

  console.log("example deployed!");

  console.log({
    token: token.address,
    timelock: timelock.address,
    govAlpha: govAlpha.address,
    example: example.address
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
