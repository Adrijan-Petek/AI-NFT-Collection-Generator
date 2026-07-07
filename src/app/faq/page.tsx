import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const faqs = [
  {
    q: "Which chains are supported?",
    a: "Base, Ethereum, and Polygon out of the box. Additional EVM-compatible chains can be configured via RPC settings in your environment.",
  },
  {
    q: "Is metadata marketplace compatible?",
    a: "Yes. Metadata follows EIP-721 and OpenSea attribute standards and works with Blur and Magic Eden on supported chains.",
  },
  {
    q: "What does Pro unlock?",
    a: "Up to 10,000 NFTs per collection, HD export, IPFS upload via Pinata, ERC-721A contract generation, mint site scaffolding, and unlimited projects.",
  },
  {
    q: "How does duplicate suppression work?",
    a: "The engine tracks all trait combinations during generation and automatically rejects any that exactly match or closely resemble an existing token before finalizing the collection.",
  },
  {
    q: "Can I export my own smart contract?",
    a: "Yes. The Pro plan generates a production-ready ERC-721A Solidity contract you can deploy through your own Hardhat or Foundry workflow.",
  },
  {
    q: "Is there a public API?",
    a: "Yes. All generation, IPFS, contract, and mint site endpoints are documented in the API Docs page.",
  },
  {
    q: "How does onchain gating work?",
    a: "Register your endpoint as an ERC-8257 tool on Base via the OpenSea registry. Set an NFT/token gate or pay-per-call policy - wallets are verified on each request.",
  },
  {
    q: "Can I self-host?",
    a: "Yes. A Dockerfile and docker-compose.yml are included. You need a Postgres database, Pinata JWT, and optional Clerk keys for auth.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-6 py-8 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/20 bg-slate-200/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-200/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div>
          <p className="kicker">Support</p>
          <h1 className="mt-1.5 text-3xl font-black tracking-[-0.03em]">Frequently Asked Questions</h1>
          <p className="mt-2 text-sm text-slate-400">Everything you need to know before launching your collection.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <GlassCard key={faq.q} className="p-5">
              <h2 className="text-sm font-bold text-white">{faq.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{faq.a}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </main>
  );
}
