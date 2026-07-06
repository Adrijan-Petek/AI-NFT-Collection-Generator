"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

type ProjectForm = {
  prompt: string;
  name: string;
  symbol: string;
  wallet: string;
  chain: "base" | "ethereum" | "polygon";
  size: number;
  resolution: "1024x1024" | "2048x2048";
  imageType: "png" | "svg";
  animated: boolean;
  metadataLanguage: string;
  royaltyBps: number;
  mintPriceEth: string;
  mintDateISO: string;
};

const initialState: ProjectForm = {
  prompt:
    "Generate a collection of 10,000 futuristic cyberpunk foxes wearing neon armor with holographic backgrounds.",
  name: "Cyber Fox Syndicate",
  symbol: "CFOX",
  wallet: "0x0000000000000000000000000000000000000000",
  chain: "base",
  size: 10000,
  resolution: "1024x1024",
  imageType: "png",
  animated: false,
  metadataLanguage: "en",
  royaltyBps: 500,
  mintPriceEth: "0.02",
  mintDateISO: new Date(Date.now() + 7 * 86400000).toISOString(),
};

export function ProjectGenerator() {
  const [form, setForm] = useState<ProjectForm>(initialState);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string>("");

  async function handleCreate() {
    setBusy(true);
    setResult("");
    try {
      const createRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData.error ? JSON.stringify(createData.error) : "Creation failed");

      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: createData.project.id, wallet: form.wallet }),
      });

      const generateData = await generateRes.json();
      if (!generateRes.ok) throw new Error(generateData.error || "Generation failed");

      setResult(`Generated ${generateData.preview.length} preview NFTs for ${generateData.draft.name}`);
    } catch (error) {
      setResult(String(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <GlassCard className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Collection Generator</h2>
      <textarea
        value={form.prompt}
        onChange={(event) => setForm((prev) => ({ ...prev, prompt: event.target.value }))}
        className="h-32 w-full rounded-xl border border-white/20 bg-black/30 p-3 text-white outline-none"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="rounded-xl border border-white/20 bg-black/30 p-3 text-white outline-none"
          placeholder="Collection name"
        />
        <input
          value={form.symbol}
          onChange={(event) => setForm((prev) => ({ ...prev, symbol: event.target.value }))}
          className="rounded-xl border border-white/20 bg-black/30 p-3 text-white outline-none"
          placeholder="Symbol"
        />
        <input
          value={form.wallet}
          onChange={(event) => setForm((prev) => ({ ...prev, wallet: event.target.value }))}
          className="rounded-xl border border-white/20 bg-black/30 p-3 text-white outline-none"
          placeholder="Wallet address for onchain Pro gate"
        />
        <input
          type="number"
          min={10}
          max={10000}
          value={form.size}
          onChange={(event) => setForm((prev) => ({ ...prev, size: Number(event.target.value) }))}
          className="rounded-xl border border-white/20 bg-black/30 p-3 text-white outline-none"
          placeholder="Collection size"
        />
        <input
          value={form.mintPriceEth}
          onChange={(event) => setForm((prev) => ({ ...prev, mintPriceEth: event.target.value }))}
          className="rounded-xl border border-white/20 bg-black/30 p-3 text-white outline-none"
          placeholder="Mint price (ETH)"
        />
      </div>
      <Button onClick={handleCreate} disabled={busy}>
        {busy ? "Generating..." : "Generate Collection"}
      </Button>
      {result ? <p className="text-sm text-amber-100">{result}</p> : null}
    </GlassCard>
  );
}
