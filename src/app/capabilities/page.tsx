import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";

const features = [
  {
    title: "Collection strategy engine",
    description: "Transforms plain-language briefs into a coherent art direction, mission narrative, and trait map.",
    detail:
      "Write freely - describe aesthetic, lore, supply cap, trait categories, and special rules. The engine extracts structure from your brief automatically and outputs a validated strategy document.",
    icon: "/file.svg",
  },
  {
    title: "Rarity balancing",
    description: "Maintains weighted distributions and enforces scarcity rules for legendary and mythic tiers.",
    detail:
      "Set rarity bands (Common, Rare, Epic, Legendary, Mythic) with target percentages. The engine adjusts trait weights in real time to hit your distribution targets precisely.",
    icon: "/icon.png",
  },
  {
    title: "Duplicate suppression",
    description: "Prevents repeated combinations and flags near-duplicates before metadata export.",
    detail:
      "Every generated token is checked against all existing tokens for exact and near-matches. Flagged tokens are regenerated automatically before the collection is finalized.",
    icon: "/window.svg",
  },
  {
    title: "Marketplace metadata",
    description: "Exports OpenSea-compatible JSON with normalized attributes and collection-level references.",
    detail:
      "All metadata follows EIP-721 and OpenSea attribute standards. Outputs include per-token JSON, a collection manifest, and a rarity rank file ready for marketplace ingestion.",
    icon: "/globe.svg",
  },
  {
    title: "Contract generation",
    description: "Produces ERC-721A-ready Solidity contracts for audited deployment workflows.",
    detail:
      "Generates a production-ready ERC-721A contract with configurable supply, mint price, allowlist, royalties (EIP-2981), and Ownable access control. Compatible with Hardhat and Foundry.",
    icon: "/file.svg",
  },
  {
    title: "Mint site scaffold",
    description: "Generates a responsive mint experience that teams can deploy and customize immediately.",
    detail:
      "Produces a Next.js mint site with wallet connect, mint button, supply counter, and payment gating. Deploys to Vercel in one command with full IPFS integration.",
    icon: "/window.svg",
  },
];

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-6 py-8 text-white">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/20 bg-slate-200/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-200/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div>
          <p className="kicker">Platform</p>
          <h1 className="mt-1.5 text-3xl font-black tracking-[-0.03em]">Capabilities</h1>
          <p className="mt-2 text-sm text-slate-400">Every tool you need to go from brief to deployed collection.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="flex flex-col border-slate-100/15 bg-slate-100/5 p-5">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/20 bg-slate-900/50 p-2">
                <Image src={feature.icon} alt="" width={18} height={18} className="opacity-60 invert" />
              </div>
              <h2 className="text-sm font-bold text-white">{feature.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{feature.description}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">{feature.detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </main>
  );
}
