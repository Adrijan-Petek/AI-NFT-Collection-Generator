"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function OpenSeaProPanel() {
  const [wallet, setWallet] = useState("0x868EDB819AF54a9C938DEA4c2e027FE050b18d0A");
  const [endpoint, setEndpoint] = useState("https://your-domain.com/api/generate");
  const [status, setStatus] = useState("");

  async function registerTool() {
    const res = await fetch("/api/tools/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toolName: "AI NFT Collection Generator Pro Tool",
        description: "Onchain-gated NFT generation tool for Base",
        httpsEndpoint: endpoint,
        owner: wallet,
        accessPolicy: {
          minNftBalance: "1",
        },
      }),
    });
    const data = await res.json();
    setStatus(JSON.stringify(data, null, 2));
  }

  async function checkAccess() {
    const res = await fetch("/api/pro/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet,
        minNftBalance: "1",
      }),
    });

    const data = await res.json();
    setStatus(JSON.stringify(data, null, 2));
  }

  return (
    <GlassCard className="space-y-4">
      <h2 className="text-2xl font-bold text-white">OpenSea Onchain Pro Access</h2>
      <p className="text-sm text-slate-300">
        Main Pro path: register your HTTPS tool endpoint in ERC-8257 on Base, gate by NFT/token, and enforce pay-per-call.
      </p>
      <input
        className="w-full rounded-xl border border-white/20 bg-black/30 p-3 text-white"
        value={wallet}
        onChange={(event) => setWallet(event.target.value)}
        placeholder="Owner / wallet address"
      />
      <input
        className="w-full rounded-xl border border-white/20 bg-black/30 p-3 text-white"
        value={endpoint}
        onChange={(event) => setEndpoint(event.target.value)}
        placeholder="Tool HTTPS endpoint"
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={registerTool}>Create registry payload</Button>
        <Button variant="secondary" onClick={checkAccess}>Check wallet gating</Button>
      </div>
      <pre className="max-h-72 overflow-auto rounded-xl bg-black/50 p-4 text-xs text-slate-200">{status || "No output yet"}</pre>
    </GlassCard>
  );
}
