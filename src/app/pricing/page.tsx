import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#030712] px-6 py-8 text-white">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/20 bg-slate-200/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-200/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
        <h1 className="text-3xl font-black">Pricing</h1>
        <p className="text-slate-300">Choose the plan that matches your collection scale.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="mt-2 text-slate-300">Up to 25 NFTs, watermarked previews, basic metadata.</p>
            <p className="mt-5 text-4xl font-black">$0</p>
            <Button className="mt-5">Current Plan</Button>
          </GlassCard>
          <GlassCard className="border-amber-300/40">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-2 text-slate-300">
              Main path: onchain access via OpenSea ERC-8257 tool registration with NFT/token gating and pay-per-call.
            </p>
            <p className="mt-5 text-4xl font-black">$49/mo</p>
            <Link href="/dashboard">
              <Button className="mt-5">Register tool + unlock Pro</Button>
            </Link>
          </GlassCard>
        </div>
        <GlassCard>
          <h3 className="text-xl font-bold">OpenSea-first Pro Flow</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-300">
            <li>Run <code>npx skills add ProjectOpenSea/opensea-skill</code></li>
            <li>Register your HTTPS endpoint in ERC-8257 on Base</li>
            <li>Set NFT/token gate and pay-per-call policy</li>
            <li>Use your wallet to access Pro generation routes</li>
          </ol>
        </GlassCard>
      </div>
    </main>
  );
}
