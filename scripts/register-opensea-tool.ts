import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildToolRegistrationPayload } from "../src/lib/onchain/opensea-tool-registry";

function env(name: string, fallback = "") {
  return process.env[name] ?? fallback;
}

const payload = buildToolRegistrationPayload({
  toolName: env("OPENSEA_TOOL_NAME", "AI NFT Collection Generator Pro Tool"),
  description: env(
    "OPENSEA_TOOL_DESCRIPTION",
    "Generate full NFT collections with onchain-gated Pro generation and pay-per-call support.",
  ),
  httpsEndpoint: env("OPENSEA_TOOL_ENDPOINT", "https://your-domain.com/api/generate"),
  owner: env("OPENSEA_TOOL_OWNER", "0x868EDB819AF54a9C938DEA4c2e027FE050b18d0A") as `0x${string}`,
  chainId: 8453,
  accessPolicy: {
    nftContract: env("PRO_NFT_GATE", "") as `0x${string}` | undefined,
    minNftBalance: BigInt(env("PRO_MIN_NFT_BALANCE", "1")),
    tokenContract: env("PRO_TOKEN_GATE", "") as `0x${string}` | undefined,
    minTokenBalance: BigInt(env("PRO_MIN_TOKEN_BALANCE", "0")),
    payPerCallWei: BigInt(env("PRO_PAY_PER_CALL_WEI", "0")),
  },
});

const outPath = resolve(process.cwd(), "opensea-tool-registration.json");
writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");

console.log(`Wrote registration payload to ${outPath}`);
