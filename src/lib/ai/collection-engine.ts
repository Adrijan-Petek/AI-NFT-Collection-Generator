import { findDuplicateTraitSets } from "@/lib/ai/duplicate-detector";
import { generateDraftFromPrompt } from "@/lib/ai/prompt-parser";
import type { GenerationSettings } from "@/types";

export type GeneratedNFT = {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
};

export type GenerationResult = {
  draft: ReturnType<typeof generateDraftFromPrompt>;
  items: GeneratedNFT[];
  duplicates: Array<[string, number[]]>;
};

export function generateCollection(prompt: string, settings: GenerationSettings): GenerationResult {
  const draft = generateDraftFromPrompt(prompt);

  const items = Array.from({ length: settings.size }, (_, index) => {
    const traits = draft.traits.map((category) => ({
      trait_type: category.name,
      value: category.values[(index + category.name.length) % category.values.length].value,
    }));

    return {
      tokenId: index + 1,
      name: `${draft.name} #${index + 1}`,
      description: draft.description,
      image: `ipfs://REPLACE_WITH_CID/${index + 1}.${settings.imageType}`,
      attributes: traits,
    };
  });

  const duplicateInput = items.map((item) =>
    Object.fromEntries(item.attributes.map((attribute) => [attribute.trait_type, attribute.value])),
  );

  const duplicates = findDuplicateTraitSets(duplicateInput);

  return {
    draft,
    items,
    duplicates,
  };
}
