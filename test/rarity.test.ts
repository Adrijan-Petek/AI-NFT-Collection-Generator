import { describe, expect, it } from "vitest";
import { estimateMintRevenue, normalizeRarity } from "@/lib/ai/rarity";

describe("rarity utilities", () => {
  it("normalizes percentages to approximately 100", () => {
    const result = normalizeRarity({ common: 50, uncommon: 25, rare: 15, epic: 5, legendary: 3, mythic: 2 });
    const total = Object.values(result).reduce((sum, value) => sum + value, 0);
    expect(total).toBeGreaterThan(99.9);
    expect(total).toBeLessThan(100.1);
  });

  it("calculates mint revenue", () => {
    expect(estimateMintRevenue(10000, "0.02")).toBe(200);
  });
});
