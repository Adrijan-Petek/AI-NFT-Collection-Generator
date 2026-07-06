export type SupportedChain = "base" | "ethereum" | "polygon";

export type RarityTier =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic";

export type TraitCategory = {
  name: string;
  values: Array<{
    value: string;
    weight: number;
    tier: RarityTier;
  }>;
};

export type CollectionDraft = {
  name: string;
  symbol: string;
  description: string;
  story: string;
  mission: string;
  utility: string;
  artDirection: string;
  traits: TraitCategory[];
  suggestedRarity: Record<RarityTier, number>;
};

export type GenerationSettings = {
  chain: SupportedChain;
  size: number;
  resolution: "1024x1024" | "2048x2048";
  imageType: "png" | "svg";
  animated: boolean;
  metadataLanguage: string;
  royaltyBps: number;
  mintPriceEth: string;
  mintDateISO: string;
};
