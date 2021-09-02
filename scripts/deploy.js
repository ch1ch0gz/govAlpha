const hre = require("hardhat");

async function main() {
  [addr1] = await ethers.provider.listAccounts();

  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy(addr1);
  await token.deployed();

  console.log("token deployed");

  const nonce = await ethers.provider.getTransactionCount(addr1);
  const govAlphaAddr = ethers.utils.getContractAddress({ from: addr1, nonce: nonce + 1 });

  const Timelock = await ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy(govAlphaAddr, 0);
  await timelock.deployed();

  console.log("timelock deployed");

  const GovernorAlpha = await ethers.getContractFactory("GovernorAlpha");
  govAlpha = await GovernorAlpha.deploy(timelock.address, token.address, addr1);
  await govAlpha.deployed();

  console.log("govalpha deployed");

  const Example = await ethers.getContractFactory("Example");
  example = await Example.deploy();
  await example.deployed();

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
