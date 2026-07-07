import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { env } from "@/lib/env";

export type AIProviderId = "groq" | "gemini" | "openrouter" | "openai";

interface ProviderConfig {
  id: AIProviderId;
  label: string;
  defaultModel: string;
  requiresKey: boolean;
  isFree: boolean;
  models: string[];
}

export const SUPPORTED_PROVIDERS: ProviderConfig[] = [
  {
    id: "groq",
    label: "Groq",
    defaultModel: "llama-3.3-70b-versatile",
    requiresKey: true,
    isFree: true,
    models: [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "gemma2-9b-it",
    ],
  },
  {
    id: "gemini",
    label: "Google Gemini",
    defaultModel: "gemini-2.5-flash",
    requiresKey: true,
    isFree: true,
    models: ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"],
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    defaultModel: "openrouter/free",
    requiresKey: true,
    isFree: true,
    models: [
      "openrouter/free",
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemini-2.0-flash-exp:free",
    ],
  },
  {
    id: "openai",
    label: "OpenAI",
    defaultModel: "gpt-4o-mini",
    requiresKey: true,
    isFree: false,
    models: ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo"],
  },
];

function getProvider(): { id: AIProviderId; model: string } {
  const configured = (env.AI_PROVIDER || "groq") as AIProviderId;
  const provider = SUPPORTED_PROVIDERS.find((p) => p.id === configured) ?? SUPPORTED_PROVIDERS[0];
  return { id: provider.id, model: env.AI_MODEL || provider.defaultModel };
}

function createClient(providerId: AIProviderId) {
  const apiKey = env.AI_API_KEY;
  if (!apiKey) {
    throw new Error(`AI_API_KEY is required for AI_PROVIDER=${providerId}`);
  }

  switch (providerId) {
    case "groq":
      return createGroq({ apiKey });
    case "gemini":
      return createGoogleGenerativeAI({ apiKey });
    case "openrouter":
      return createOpenAI({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
        name: "openrouter",
        headers: {
          "HTTP-Referer": env.NEXT_PUBLIC_APP_URL,
          "X-Title": "AI NFT Collection Generator",
        },
      });
    case "openai":
      return createOpenAI({ apiKey });
    default:
      return createGroq({ apiKey });
  }
}

export async function generateAIResponse(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number; maxTokens?: number },
): Promise<string> {
  const { id: providerId, model: modelName } = getProvider();
  const client = createClient(providerId);

  const result = await generateText({
    model: client(modelName),
    instructions: systemPrompt,
    prompt: userPrompt,
    temperature: options?.temperature ?? 0.7,
    maxOutputTokens: options?.maxTokens ?? 4096,
  });

  return result.text;
}

export async function generateStructuredJSON<T>(
  systemPrompt: string,
  userPrompt: string,
  options?: { temperature?: number },
): Promise<T> {
  const text = await generateAIResponse(systemPrompt, userPrompt, {
    ...options,
    temperature: options?.temperature ?? 0.3,
  });

  // Extract JSON from the response (handle markdown code fences)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) ?? [null, text];
  const jsonStr = jsonMatch[1]?.trim() ?? text.trim();

  return JSON.parse(jsonStr) as T;
}
