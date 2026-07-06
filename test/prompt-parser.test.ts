import { describe, expect, it } from "vitest";
import { generateDraftFromPrompt } from "@/lib/ai/prompt-parser";

describe("prompt parser", () => {
  it("generates a complete collection draft", () => {
    const draft = generateDraftFromPrompt("Cyberpunk foxes with laser eyes");
    expect(draft.name.length).toBeGreaterThan(3);
    expect(draft.traits.length).toBeGreaterThan(5);
    expect(draft.suggestedRarity.common).toBeGreaterThan(0);
  });
});
