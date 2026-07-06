import { z } from "zod";

const address = z.string().regex(/^0x[a-fA-F0-9]{40}$/);

export const registerToolSchema = z.object({
  toolName: z.string().min(3).max(80),
  description: z.string().min(10).max(500),
  httpsEndpoint: z.string().url(),
  owner: address,
  accessPolicy: z.object({
    nftContract: address.optional(),
    minNftBalance: z.coerce.bigint().optional(),
    tokenContract: address.optional(),
    minTokenBalance: z.coerce.bigint().optional(),
    payPerCallWei: z.coerce.bigint().optional(),
  }),
});

export const accessCheckSchema = z.object({
  wallet: address,
  nftContract: address.optional(),
  minNftBalance: z.coerce.bigint().optional(),
  tokenContract: address.optional(),
  minTokenBalance: z.coerce.bigint().optional(),
});
