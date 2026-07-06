import { z } from "zod";

export const projectSchema = z.object({
  prompt: z.string().min(10),
  name: z.string().min(2).max(80),
  symbol: z.string().min(2).max(8),
  chain: z.enum(["base", "ethereum", "polygon"]),
  size: z.number().int().min(10).max(10000),
  resolution: z.enum(["1024x1024", "2048x2048"]),
  imageType: z.enum(["png", "svg"]),
  animated: z.boolean(),
  metadataLanguage: z.string().default("en"),
  royaltyBps: z.number().int().min(0).max(1000),
  mintPriceEth: z.string(),
  mintDateISO: z.string(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
