"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function PreviewPanel() {
  const [projectId, setProjectId] = useState("");
  const [response, setResponse] = useState<string>("");

  async function action(path: string) {
    if (!projectId.trim()) {
      setResponse("Enter a project ID first");
      return;
    }

    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  return (
    <GlassCard className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Collection Preview & Export</h2>
      <input
        value={projectId}
        onChange={(event) => setProjectId(event.target.value)}
        placeholder="Project ID"
        className="w-full rounded-xl border border-white/20 bg-black/30 p-3 text-white outline-none"
      />
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => action("/api/contracts/generate")}>Generate contract</Button>
        <Button variant="secondary" onClick={() => action("/api/mint-site/generate")}>Generate mint site</Button>
        <Button onClick={() => action("/api/ipfs/upload")}>Upload metadata to IPFS</Button>
      </div>
      <pre className="max-h-72 overflow-auto rounded-xl bg-black/50 p-4 text-xs text-slate-200">{response || "No actions yet"}</pre>
    </GlassCard>
  );
}
