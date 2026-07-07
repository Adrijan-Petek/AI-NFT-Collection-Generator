import { normalizeRarity } from "@/lib/ai/rarity";
import { generateStructuredJSON } from "@/lib/ai/provider";
import type { CollectionDraft } from "@/types";

const DEFAULT_CATEGORIES = [
  "Background",
  "Eyes",
  "Mouth",
  "Clothes",
  "Accessories",
  "Hats",
  "Weapons",
  "Special Effects",
  "Pets",
];

const SYSTEM_PROMPT = `You are an expert NFT collection strategist. Given a user's prompt, generate a detailed collection draft as JSON.

Return valid JSON with this exact shape:
{
  "name": "Collection name (max 40 chars)",
  "symbol": "4-6 letter ticker",
  "description": "1-2 sentence collection description",
  "story": "A short lore paragraph about the collection universe",
  "mission": "What this collection aims to achieve",
  "utility": "What holders get (access, governance, unlocks)",
  "artDirection": "Visual style guidance for the collection",
  "traits": [
    {
      "name": "Trait category name",
      "values": [
        { "value": "Trait value", "weight": <number 1-100>, "tier": "common|uncommon|rare|legendary" }
      ]
    }
  ],
  "suggestedRarity": {
    "common": <number>,
    "uncommon": <number>,
    "rare": <number>,
    "legendary": <number>
  }
}

Rules:
- Generate 5-9 trait categories. Use the prompt's theme to inspire categories.
- Each category should have 3-6 values with weights that sum to 100.
- Tiers: common (weight 40-60), uncommon (20-35), rare (10-20), legendary (1-5).
- suggestedRarity percentages should sum to 100.
- Be creative and match the prompt's theme, style, and mood.`;

export async function generateDraftFromPrompt(prompt: string): Promise<CollectionDraft> {
  const cleanPrompt = prompt.trim();

  try {
    const draft = await generateStructuredJSON<CollectionDraft>(SYSTEM_PROMPT, cleanPrompt, {
      temperature: 0.8,
    });

    // Ensure required fields exist
    return {
      name: draft.name || `AI NFT Collection ${cleanPrompt.split(/\s+/).slice(0, 3).join(" ")}`,
      symbol: draft.symbol || "NFAI",
      description: draft.description || `AI-generated NFT collection based on: ${cleanPrompt}`,
      story: draft.story || "In a future where digital legends guard interchain portals, each holder unlocks the lore and evolution of their NFT identity.",
      mission: draft.mission || "Blend creative AI and onchain ownership into collections anyone can launch at production quality.",
      utility: draft.utility || "Holder access to gated drops, governance votes, and future dynamic trait unlocks.",
      artDirection: draft.artDirection || "Bold silhouettes, cinematic contrast, high detail accessories, and consistent lighting across the full set.",
      traits: draft.traits?.length ? draft.traits : DEFAULT_CATEGORIES.map((name) => ({
        name,
        values: [
          { value: "Standard", weight: 50, tier: "common" },
          { value: "Enhanced", weight: 30, tier: "uncommon" },
          { value: "Elite", weight: 15, tier: "rare" },
          { value: "Ultra", weight: 5, tier: "legendary" },
        ],
      })),
      suggestedRarity: draft.suggestedRarity ?? normalizeRarity({}),
    };
  } catch {
    // Fallback to deterministic generation if AI fails
    const words = cleanPrompt.split(/\s+/).filter(Boolean);
    const subject = words.slice(0, 3).join(" ") || "Neo Creatures";

    return {
      name: `AI NFT Collection ${subject}`,
      symbol: "NFAI",
      description: `AI-generated NFT collection based on: ${cleanPrompt}`,
      story: "In a future where digital legends guard interchain portals, each holder unlocks the lore and evolution of their NFT identity.",
      mission: "Blend creative AI and onchain ownership into collections anyone can launch at production quality.",
      utility: "Holder access to gated drops, governance votes, and future dynamic trait unlocks.",
      artDirection: "Bold silhouettes, cinematic contrast, high detail accessories, and consistent lighting across the full set.",
      traits: DEFAULT_CATEGORIES.map((name) => ({
        name,
        values: [
          { value: "Standard", weight: 50, tier: "common" },
          { value: "Enhanced", weight: 30, tier: "uncommon" },
          { value: "Elite", weight: 15, tier: "rare" },
          { value: "Ultra", weight: 5, tier: "legendary" },
        ],
      })),
      suggestedRarity: normalizeRarity({}),
    };
  }
}
