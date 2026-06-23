import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const initialOwnerAddress = process.env.INITIAL_OWNER_ADDRESS;

  if (!initialOwnerAddress) {
    throw new Error("INITIAL_OWNER_ADDRESS environment variable is not set");
  }

  console.log("Deploying TrustScoreRegistry with the following setup:");
  console.log("Deployer address:", deployer.address);
  console.log("Initial owner address:", initialOwnerAddress);

  const TrustScoreRegistry = await ethers.getContractFactory("TrustScoreRegistry");
  const registry = await TrustScoreRegistry.deploy(initialOwnerAddress);

  await registry.waitForDeployment();

  const contractAddress = await registry.getAddress();
  const network = await ethers.provider.getNetwork();

  console.log("TrustScoreRegistry deployed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
