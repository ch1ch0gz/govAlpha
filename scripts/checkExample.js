const exampleAddr = ""; // TODO: <-- add example address here

async function main() {
  const example = await ethers.getContractAt("Example", exampleAddr);

  console.log("Current Message:", await example.message());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
