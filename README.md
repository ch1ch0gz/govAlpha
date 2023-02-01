# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```




The Governor Alpha contract is a simple and extensible on-chain governance lego that provides DAOs with the ability to govern their projects as well as offering a standard to tools that wish to integrate with that governance.

For an in-depth look at the compound Governor contract: see their documentation here.

Lifecycle
In that documentation you'll see the governance lifecycle:

Governance Lifecycle

Someone with enough voting power starts the process off by creating a proposal. After being proposed, this proposal is voted on, queued for execution, and finally executed after the queue period is completed. This proposal can include one or many transactions with arbitrary calldata that can be sent to any address. This calldata flexibility allows this governance standard to make any function call to any visible function on a smart contract in the EVM.

Let's take a look at this lifecycle in code. This repository contains the contracts, scripts and test cases for the full scenario.

Proposal - First an individual requires enough voting power to be able to make a proposal. They will need to delegate to themselves this voting power through the token contract. Once they have this voting power they can make a proposal encoding arbitrary calldata to any given smart contract address. In this example you can see we are targeting the example contract with the calldata to call changeMessage with a string "Destroy All Humans!".

Voting - During the voting period, any individual with delegated voting power can vote on the proposal. They do so by calling the castVote function on the governance contract, see an example here. In this case, this individual holds all the voting power, so no further voting is needed. If the quorum threshold is reached with the voting period and the number of for votes outweighs the against votes then the proposal succeeds.

Queue - At this point, the proposal is placed into a TimeLock via the queue method. This allows for plenty of time for the community to adjust to this new proposal that has been passed.

Execute - After the timelock delay has expired, someone can execute the governance proposal. This will execute the transaction, sending any calldata and ether to the target address as specified.

Try It Out
Excited to kick off your own proposals?

First let's cover a bit of background info:

Background Information

We're going to be working with a sample repository today that will help us use the Compound Governor Alpha contracts to govern a simple Example contract. Through this governance process you will create a proposal, vote on it, queue it and execute it. At the end of the process this proposal will modify a variable on the Example contract.

🤔 Think about this! After you complete the exercise you'll be able to replace that example contract with anything. Anything you'd like can become governable!

There are four main contracts in the repository we'll be working on:

Example: This is a simple example to show a contract that could be controlled by a governance contract!
Governor Alpha: This is the core of the governor logic. In here you’ll find proposal creation and functions that help guide the proposal’s states and lifecycle.
Token: This is an ERC20 token with added functionality to make it possible to easily track how many votes an individual has delegated to them. It uses checkpoints to avoid having to lookup how much voting power each delegate has.
Timelock: This is the contract that actually executes the proposal. After Governor Alpha is satisfied that the vote has successfully passed, it hands off the execution of the proposal to the timelock so that it will occur after some period of time.
Ok, let's jump into it!

Setup

Let's get the repository all setup first:

Clone the repository: git clone https://github.com/Dan-Nolan/GovAlpha.git
In the repository, install all dependencies with npm i
Create a .env containing two keys: INFURA and PRIVATE_KEY. By default the network in the configuration is listed as rinkeby, but feel free to choose a testnet where you have some testnet ether, and choose a testnet private key (be absolutely sure this is not linked to any mainnet funds!). Fill in these values in the .env so you have a file that looks like this:
PRIVATE_KEY=x
INFURA=y
Where x is your private key associated to a testnet account that has testnet ether and y is an infura URL which points to an infura node on the same testnet.

Deployment

To deploy the contracts, run npx hardhat run scripts/deploy.js --network rinkeby to deploy all the contracts. At the end of this script you will receive the addresses for all of the contracts. Hold onto these addresses, we'll use them in the following scripts.

Proposal

Open up the file scripts/proposal.js into a text editor/IDE. In this file you'll notice that we are creating a proposal. The function targets the changeMsg function on the example contract. There are three high level steps here:

Change the exampleAddr, govAlphaAddr, and tokenAddr in proposal.js to match the addresses the deploy script provided you in the previous step.
Change the message in the calldatas array to be your own message you'd like to change it to!
Run npx hardhat run scripts/proposal.js --network rinkeby to kick off the proposal.
☝️ This is your proposal! So long as the governance passes, your new message will be reflected in the example contract.

🤔 Note that the GovernorAlpha only allows one person to have one proposal open at a time. If you try to open a new proposal before the voting period of the first one has closed, it will revert with an error message.

Check State

You can check on the status of your proposal any time by using the scripts/getState.js script. This script will output two important pieces of information:

The Proposal Struct - The proposal struct contains a ton of useful information about your proposal. Among the information you'll find the start and end block for the voting period. After rinkeby has reached the end block, the voting period will be over.
The Proposal State - The proposal state will be returned as an int8, represented by these enum values. Enum's are zero-based, so if it returns 0 the current state is Pending. If it returns 1 the current state is Active (which means it's time to vote!)
To run this script, you'll need to set the addresses in the file and then run npx hardhat run scripts/getState.js --network rinkeby.

Be careful! There is essentially a timer on this stage in that the voting period is hardcoded to be about 15 minutes. After that 15 minutes is up, you will be unable to cast your vote. In production this would be a much longer period for actual voting to occur.

🤔 Note that the first PROPOSAL_ID is 1. If you'd like to vote on another proposal in the future you'll need to change this id.

Cast Vote

It's time to cast your vote! Open up the file scripts/castVote.js and change the govAlphaAddr and tokenAddr to the addresses you received in the deployment step.

Then run npx hardhat run scripts/castVote.js --network rinkeby to cast your vote on the proposal!

Execute

Finally, it's almost time to execute. First, be sure that the voting period is completed. To be sure, check the state of the proposal. Once its in the Succeeded state, you are ready to execute!

Open the scripts/execute.js file and modify the govAlphaAddr. Then run npx hardhat run scripts/execute.js --network rinkeby.

If all goes well you should be able to see your message in the example contract! You can run the scripts/checkExample.js script to see what the message is. You will first need to add in the example address and then you can run npx hardhat run scripts/checkExample.js --network rinkeby.

Did you see your new message? Congratulations! Next, think about what kind of real functionality you would like to use this for. Perhaps instead of the Example contract you'd like to point this at your own contract for an upgrade or an important parameter change in a protocol!
