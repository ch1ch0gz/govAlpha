require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.5.16",
  networks: {
    rinkeby: {
      url: process.env.INFURA,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
