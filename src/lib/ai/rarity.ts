import type { RarityTier } from "@/types";

export const DEFAULT_RARITY: Record<RarityTier, number> = {
  common: 45,
  uncommon: 25,
  rare: 15,
  epic: 8,
  legendary: 5,
  mythic: 2,
};

export function normalizeRarity(input: Partial<Record<RarityTier, number>>) {
  const merged = { ...DEFAULT_RARITY, ...input };
  const total = Object.values(merged).reduce((sum, value) => sum + value, 0);

  return Object.fromEntries(
    Object.entries(merged).map(([tier, value]) => [
      tier,
      Number(((value / total) * 100).toFixed(2)),
    ]),
  ) as Record<RarityTier, number>;
}

export function estimateMintRevenue(totalSupply: number, mintPriceEth: string) {
  const parsed = Number(mintPriceEth);
  if (Number.isNaN(parsed)) return 0;
  return Number((totalSupply * parsed).toFixed(4));
}
