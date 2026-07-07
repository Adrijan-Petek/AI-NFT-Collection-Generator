import { defineConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const normalizedPrivateKey = PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY.slice(2) : PRIVATE_KEY;
const accounts = normalizedPrivateKey.length === 64 ? [PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`] : [];

const config = defineConfig({
  solidity: {
    profiles: {
      default: {
        version: "0.8.24",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    base: {
      type: "http",
      chainType: "l1",
      url: process.env.BASE_RPC_URL ?? "",
      accounts,
    },
    ethereum: {
      type: "http",
      chainType: "l1",
      url: process.env.ETHEREUM_RPC_URL ?? "",
      accounts,
    },
    polygon: {
      type: "http",
      chainType: "l1",
      url: process.env.POLYGON_RPC_URL ?? "",
      accounts,
    },
  },
});

export default config;
