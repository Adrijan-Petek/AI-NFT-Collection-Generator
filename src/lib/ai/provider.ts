import { generateText, type CoreMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { env } from "@/lib/env";

export type AIProviderId = "openai" | "gemini" | "groq";

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
    id: "openai",
    label: "OpenAI",
    defaultModel: "gpt-4o-mini",
    requiresKey: true,
    isFree: false,
    models: ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo"],
  },
  {
    id: "gemini",
    label: "Google Gemini",
    defaultModel: "gemini-2.0-flash",
    requiresKey: true,
    isFree: true,
    models: ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash", "gemini-1.5-pro"],
  },
  {
    id: "groq",
    label: "Groq (Free)",
    defaultModel: "llama-3.3-70b-versatile",
    requiresKey: true,
    isFree: true,
    models: [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768",
      "gemma2-9b-it",
    ],
  },
];

function getProvider(): { id: AIProviderId; model: string } {
  const configured = (env.AI_PROVIDER || "groq") as AIProviderId;
  const provider = SUPPORTED_PROVIDERS.find((p) => p.id === configured) ?? SUPPORTED_PROVIDERS[2];
  return { id: provider.id, model: env.AI_MODEL || provider.defaultModel };
}

function createClient(providerId: AIProviderId) {
  const apiKey = env.AI_API_KEY;

  switch (providerId) {
    case "openai":
      return createOpenAI({ apiKey });
    case "gemini":
      return createGoogleGenerativeAI({ apiKey });
    case "groq":
      return createGroq({ apiKey });
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

  const messages: CoreMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const result = await generateText({
    model: client(modelName),
    messages,
    temperature: options?.temperature ?? 0.7,
    maxTokens: options?.maxTokens ?? 4096,
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