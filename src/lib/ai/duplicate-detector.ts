type TraitSet = Record<string, string>;

export function traitSignature(traits: TraitSet) {
  return Object.entries(traits)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
}

export function findDuplicateTraitSets(collection: TraitSet[]) {
  const map = new Map<string, number[]>();

  collection.forEach((traits, index) => {
    const signature = traitSignature(traits);
    const existing = map.get(signature) ?? [];
    existing.push(index);
    map.set(signature, existing);
  });

  return [...map.entries()].filter(([, indexes]) => indexes.length > 1);
}

export function hashImageLike(base64: string) {
  return Buffer.from(base64).toString("base64url").slice(0, 24);
}
