function isUnsetOrPlaceholder(value: string | undefined) {
  if (!value) return true;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return true;

  return (
    normalized.includes("xxxx") ||
    normalized.includes("replace") ||
    normalized.includes("your-") ||
    normalized.includes("example")
  );
}

export function isValidClerkPublishableKey(value: string | undefined) {
  if (isUnsetOrPlaceholder(value)) return false;
  const normalized = value!.trim();
  return /^pk_(test|live)_[a-zA-Z0-9_\-]+$/.test(normalized);
}

export function isValidClerkSecretKey(value: string | undefined) {
  if (isUnsetOrPlaceholder(value)) return false;
  const normalized = value!.trim();
  return /^sk_(test|live)_[a-zA-Z0-9_\-]+$/.test(normalized);
}

export function hasValidClerkConfig() {
  return (
    isValidClerkPublishableKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    isValidClerkSecretKey(process.env.CLERK_SECRET_KEY)
  );
}