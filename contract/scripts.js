import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export async function Deploy() {
  console.log("deploying...");
  const currentDir = process.cwd();
  const abipath = path.join(currentDir, "build1/dino_sol_DinoDao.abi");
  const binpath = path.join(currentDir, "build1/dino_sol_DinoDao.bin");
  const deploymentPath = path.join(
    currentDir,
    "build1/deployment/deployment.json"
  );

  const Abi = JSON.parse(fs.readFileSync(abipath, "utf-8"));
  const bin = fs.readFileSync(binpath, "utf-8");

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const ContractAddress = "0xB07BfEc947903a253eE0E336035c76AC5a4A71a3";
  const factory = new ethers.ContractFactory(Abi, bin, wallet);
  const contract = await factory.deploy(ContractAddress, { gasLimit: 5000000 });

  await contract.waitForDeployment();

  console.log("Contract deployed at:", contract.target);

  const deploymentDir = path.dirname(deploymentPath);
  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }

  const deploymentData = {
    address: contract.target,
    network: process.env.RPC_URL,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    deploymentPath,
    JSON.stringify(deploymentData, null, 2),
    "utf-8"
  );
}

Deploy().catch(console.error);
