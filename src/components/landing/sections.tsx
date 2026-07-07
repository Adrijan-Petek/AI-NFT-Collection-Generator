import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";

const features = [
  {
    title: "Collection strategy engine",
    description: "Transforms plain-language briefs into a coherent art direction, mission narrative, and trait map.",
    icon: "/file.svg",
  },
  {
    title: "Rarity balancing",
    description: "Maintains weighted distributions and enforces scarcity rules for legendary and mythic tiers.",
    icon: "/icon.png",
  },
  {
    title: "Duplicate suppression",
    description: "Prevents repeated combinations and flags near-duplicates before metadata export.",
    icon: "/window.svg",
  },
  {
    title: "Marketplace metadata",
    description: "Exports OpenSea-compatible JSON with normalized attributes and collection-level references.",
    icon: "/globe.svg",
  },
  {
    title: "Contract generation",
    description: "Produces ERC-721A-ready Solidity contracts for audited deployment workflows.",
    icon: "/file.svg",
  },
  {
    title: "Mint site scaffold",
    description: "Generates a responsive mint experience that teams can deploy and customize immediately.",
    icon: "/window.svg",
  },
];

const workflow = [
  {
    id: "01",
    title: "Define the collection brief",
    detail: "Describe the universe, style, supply cap, and utility. The engine derives collection constraints.",
  },
  {
    id: "02",
    title: "Generate and validate",
    detail: "Create traits, rarity, and preview assets while running duplicate and consistency checks.",
  },
  {
    id: "03",
    title: "Deploy and launch",
    detail: "Export metadata, contract code, and mint site package for a production-ready release.",
  },
];

const faqs = [
  {
    q: "Which chains are supported?",
    a: "Base, Ethereum, and Polygon out of the box.",
  },
  {
    q: "Is metadata marketplace compatible?",
    a: "Yes. Metadata follows OpenSea standards and works with Blur and Magic Eden on supported chains.",
  },
  {
    q: "What does Pro unlock?",
    a: "Up to 10,000 NFTs, HD export, IPFS upload, contract generation, mint website generation, and unlimited projects.",
  },
];

const testimonials = [
  {
    quote: "We launched our mint in 6 days instead of 6 weeks.",
    by: "Ari, Founder @ ChainBeasts",
  },
  {
    quote: "Trait and rarity tooling alone replaced three separate tools.",
    by: "Maya, NFT Producer",
  },
  {
    quote: "The generated contract compiled on first try in Hardhat.",
    by: "Noah, Smart Contract Engineer",
  },
];

export function LandingSections() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pb-24 text-white md:px-6">
      <section id="workflow" className="reveal panel rounded-3xl p-5 md:p-7">
        <p className="kicker">Workflow</p>
        <h2 className="mt-2 max-w-[24ch] text-balance text-xl font-black leading-tight tracking-[-0.025em] md:text-2xl">
          Built for creator teams shipping at production speed
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {workflow.map((step) => (
            <div key={step.id} className="rounded-2xl border border-slate-200/20 bg-slate-950/30 p-4">
              <p className="text-xs font-semibold tracking-[0.14em] text-cyan-200">STEP {step.id}</p>
              <h3 className="mt-1.5 text-sm font-bold text-white">{step.title}</h3>
              <p className="mt-1.5 text-xs text-slate-300">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="reveal grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <GlassCard key={feature.title} className="border-slate-100/15 bg-slate-100/5 p-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/20 bg-slate-900/40 p-1.5">
              <Image src={feature.icon} alt="" width={16} height={16} className="opacity-60 invert" />
            </div>
            <h3 className="text-sm font-bold text-white">{feature.title}</h3>
            <p className="mt-1.5 text-xs text-slate-300">{feature.description}</p>
          </GlassCard>
        ))}
      </section>

      <section id="pricing" className="reveal grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="border-cyan-200/25 bg-cyan-200/8">
          <p className="kicker">Professional Plan</p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">Pro</h3>
          <p className="mt-1.5 max-w-[46ch] text-sm text-slate-200">
            End-to-end generation with contract, metadata, and deployment tooling for serious launches.
          </p>
          <p className="mt-4 text-3xl font-black text-white">$49<span className="text-base font-normal text-slate-300">/mo</span></p>
          <ul className="mt-5 grid gap-2 text-sm text-slate-100">
            <li>Up to 10,000 NFT outputs per collection</li>
            <li>OpenSea-ready metadata and rarity controls</li>
            <li>ERC-721A contract scaffolding and export</li>
            <li>Mint site generation and Pinata IPFS pipeline</li>
          </ul>
        </GlassCard>
        <GlassCard>
          <h3 className="text-xl font-bold">Starter</h3>
          <p className="mt-1.5 text-sm text-slate-200">Great for validation and concepting before full production launch.</p>
          <p className="mt-4 text-3xl font-black">$0</p>
          <ul className="mt-5 grid gap-2 text-sm text-slate-300">
            <li>Up to 25 NFT previews</li>
            <li>Basic metadata export</li>
            <li>Trait draft and rarity baseline</li>
          </ul>
        </GlassCard>
      </section>

      <section id="faq" className="reveal grid gap-6 lg:grid-cols-3">
        {faqs.map((faq) => (
          <GlassCard key={faq.q} className="border-slate-100/15 bg-slate-100/5 p-4">
            <h4 className="text-sm font-bold text-white">{faq.q}</h4>
            <p className="mt-1.5 text-xs text-slate-300">{faq.a}</p>
          </GlassCard>
        ))}
      </section>

      <section id="testimonials" className="reveal grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <GlassCard key={item.by} className="border-slate-100/15 bg-slate-100/5 p-4">
            <p className="text-xs text-slate-200">&quot;{item.quote}&quot;</p>
            <p className="mt-2.5 text-xs font-semibold text-cyan-300">{item.by}</p>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
