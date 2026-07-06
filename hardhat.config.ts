import type { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const normalizedPrivateKey = PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY.slice(2) : PRIVATE_KEY;
const accounts = normalizedPrivateKey.length === 64 ? [PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    base: {
      url: process.env.BASE_RPC_URL ?? "",
      accounts,
    },
    ethereum: {
      url: process.env.ETHEREUM_RPC_URL ?? "",
      accounts,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL ?? "",
      accounts,
    },
  },
};

export default config;
