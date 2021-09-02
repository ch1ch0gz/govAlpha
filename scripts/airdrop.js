const hre = require("hardhat");

const tokenAddr = "0xE30a4B00e7197F47CE120a28208cC145a269aa49";
const totalSupply = 10_000_000;
const addrs = [
  "0x7Fa1ee5AdAA1AEA9093B7b4fd57a5Db8230346Dc", //chris
  "0x6368CD30cc23277CF1886841E138e864e11d1981", //stuart
  "0xbF86cD37c6b92D14Ea084711a026dB9e469673eE", //ross
  "0x1009D8B12462E2bdE8f97F89915833E80B3A6E7E", //dilan
  "0x95c5bDD933BE67a9fF67a5DD9aE9dd440b2604dB", //can dost
  "0x92bC0dA159D495d3Ca7081544841EC6BD415eB9E", //nic
  "0xA425C8a9c421502b32153Ab795C210153aE11Aa5", //daniel
  "0x86990A525c0E2b9eF30981288A5C3685cE5fCb30", //wen
  "0xAfb15817Da348A4F0AFE02724D3c105ecDC3c38a", //kevin r
  "0xaf4C8ee188f3385a4b4d453f8D9344C6A63d6370", //jamie
  "0x54b187c471f572136e3FC63BCEAC736960599494", //jacob
  "0x2E7e5E02Bd40953D8C346a51D1B6D08C039CA6BD", //al
  "0xa8b2586165fCf2138282b724e9F6E6509532c6B3", //shivali
  "0x7c8A0f7f04C28E8aFDBD7cde9903Ba413E883324", //riccardo
  "0xc310B0313C26aA229573879bc8FE935132025AB1", //turner
  "0x37D2Ce26182DC690cB4b24db218cA3E3bd799e14",
  "0xFB54E57F39DdE28a48c8E9a9d15a9a800629bc6b",//nick
]

async function main() {
  const token = await ethers.getContractAt("Token", tokenAddr);
  const share = Math.floor((totalSupply - 500_000) / addrs.length);

  for(let i = 0; i < addrs.length; i++) {
    await token.transfer(addrs[i], share.toString());
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
