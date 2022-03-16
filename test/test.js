const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

const { getContractAddress } = ethers.utils;

describe("GovernorAlpha", function () {
  const delay = 2 * 24 * 60 * 60;
  let addr1, govAlpha, token, example;
  beforeEach(async () => {
    [addr1] = await ethers.provider.listAccounts();

    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(addr1);
    await token.deployed();

    const nonce = await ethers.provider.getTransactionCount(addr1);
    const govAlphaAddr = getContractAddress({ from: addr1, nonce: nonce + 1 });

    const Timelock = await ethers.getContractFactory("Timelock");
    const timelock = await Timelock.deploy(govAlphaAddr, delay);
    await timelock.deployed();

    const GovernorAlpha = await ethers.getContractFactory("GovernorAlpha");
    govAlpha = await GovernorAlpha.deploy(timelock.address, token.address, addr1);
    await govAlpha.deployed();

    const Example = await ethers.getContractFactory("Example");
    example = await Example.deploy(timelock.address);
    await example.deployed();
  });

  it("should mint tokens to the address 1", async function () {
    const balance = await token.balanceOf(addr1);
    assert.equal(balance.toString(), ethers.utils.parseEther("10000000").toString());
  });

  describe("create a proposal", () => {
    beforeEach(async () => {
      await token.delegate(addr1);

      const targets = [example.address];
      const values = ["0"];
      const signatures = [""];
      const calldatas = [example.interface.encodeFunctionData("changeMsg", ["Destroy All Humans!"])];
      const description = "Setting a new message!";

      await govAlpha.propose(targets, values, signatures, calldatas, description);
    });

    it("should have created the proposal", async () => {
      const proposal = await govAlpha.proposals(1);
      assert(proposal.startBlock.gt(0));
    });

    describe("vote on the proposal", async () => {
      beforeEach(async () => {
        await hre.network.provider.send("evm_mine");
        await govAlpha.castVote(1, true);

        const { startBlock, endBlock } = await govAlpha.proposals(1);
        const diff = endBlock.sub(startBlock);
        for (let i = 0; i < diff.toNumber(); i++) {
          await hre.network.provider.send("evm_mine");
        }
      });

      it("should change the proposal state", async () => {
        const state = await govAlpha.state(1);
        assert.equal(state.toString(), "4");
      });

      describe("execute the proposal", () => {
        beforeEach(async () => {
          await govAlpha.queue(1);

          const { eta } = await govAlpha.proposals(1);

          await hre.network.provider.send("evm_setNextBlockTimestamp", [eta.toNumber()]);

          await govAlpha.execute(1);
        });

        it("should change the message", async () => {
          const message = await example.message();
          assert.equal(message, "Destroy All Humans!");
        });
      });
    });
  });
});

describe("Example", function () {
  beforeEach(async () => {
    const Example = await ethers.getContractFactory("Example");
    example = await Example.deploy(ethers.constants.AddressZero);
    await example.deployed();
  });

  it("should revert when a non-admin attempts to change the message", async () => {
    const tx = example.changeMsg("I am not the admin!");
    await expect(tx).to.be.reverted;
  });
});