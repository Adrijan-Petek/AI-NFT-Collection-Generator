import { normalizeRarity } from "@/lib/ai/rarity";
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

export function generateDraftFromPrompt(prompt: string): CollectionDraft {
  const cleanPrompt = prompt.trim();
  const words = cleanPrompt.split(/\s+/).filter(Boolean);
  const subject = words.slice(0, 3).join(" ") || "Neo Creatures";

  return {
    name: `AI NFT Collection ${subject}`,
    symbol: "NFAI",
    description: `AI-generated NFT collection based on: ${cleanPrompt}`,
    story:
      "In a future where digital legends guard interchain portals, each holder unlocks the lore and evolution of their NFT identity.",
    mission:
      "Blend creative AI and onchain ownership into collections anyone can launch at production quality.",
    utility:
      "Holder access to gated drops, governance votes, and future dynamic trait unlocks.",
    artDirection:
      "Bold silhouettes, cinematic contrast, high detail accessories, and consistent lighting across the full set.",
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
