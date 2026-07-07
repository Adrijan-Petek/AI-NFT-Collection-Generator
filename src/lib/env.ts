import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  // Optional at parse-time to avoid failing build on routes that do not need DB access.
  DATABASE_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_PRO_MONTHLY: z.string().optional(),
  PINATA_JWT: z.string().optional(),
  PINATA_GATEWAY: z.string().default("https://gateway.pinata.cloud/ipfs"),
  NEXT_PUBLIC_DEFAULT_CHAIN: z.enum(["base", "ethereum", "polygon"]).default("base"),
  AI_PROVIDER: z.enum(["groq", "gemini", "openrouter", "openai"]).default("groq"),
  AI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export type AppEnv = typeof env;
