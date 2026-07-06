import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

export type ToolAccessPolicy = {
  nftContract?: `0x${string}`;
  minNftBalance?: bigint;
  tokenContract?: `0x${string}`;
  minTokenBalance?: bigint;
  payPerCallWei?: bigint;
};

export type RegisterToolInput = {
  toolName: string;
  description: string;
  httpsEndpoint: string;
  owner: `0x${string}`;
  chainId?: number;
  accessPolicy: ToolAccessPolicy;
};

const erc20Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
] as const;

const erc721Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
  },
] as const;

export function buildToolRegistrationPayload(input: RegisterToolInput) {
  return {
    registry: "ERC-8257 Agent Tool Registry",
    chainId: input.chainId ?? 8453,
    toolName: input.toolName,
    owner: input.owner,
    endpoint: input.httpsEndpoint,
    description: input.description,
    accessPolicy: {
      nftContract: input.accessPolicy.nftContract ?? null,
      minNftBalance: input.accessPolicy.minNftBalance?.toString() ?? "0",
      tokenContract: input.accessPolicy.tokenContract ?? null,
      minTokenBalance: input.accessPolicy.minTokenBalance?.toString() ?? "0",
      payPerCallWei: input.accessPolicy.payPerCallWei?.toString() ?? "0",
    },
  };
}

export async function verifyWalletAccessOnBase(args: {
  wallet: `0x${string}`;
  policy: ToolAccessPolicy;
  rpcUrl?: string;
}) {
  const client = createPublicClient({
    chain: base,
    transport: http(args.rpcUrl || process.env.BASE_RPC_URL || "https://mainnet.base.org"),
  });

  if (args.policy.nftContract && args.policy.minNftBalance && args.policy.minNftBalance > 0n) {
    const nftBalance = await client.readContract({
      address: args.policy.nftContract,
      abi: erc721Abi,
      functionName: "balanceOf",
      args: [args.wallet],
    });

    if (nftBalance < args.policy.minNftBalance) {
      return { allowed: false, reason: "NFT gate check failed" };
    }
  }

  if (args.policy.tokenContract && args.policy.minTokenBalance && args.policy.minTokenBalance > 0n) {
    const tokenBalance = await client.readContract({
      address: args.policy.tokenContract,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [args.wallet],
    });

    if (tokenBalance < args.policy.minTokenBalance) {
      return { allowed: false, reason: "Token gate check failed" };
    }
  }

  return { allowed: true, reason: "Access granted" };
}
