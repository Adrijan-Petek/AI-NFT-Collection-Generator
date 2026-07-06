import { GlassCard } from "@/components/ui/glass-card";

const features = [
  "Prompt-to-collection AI planning",
  "Style-consistent high-res generation",
  "Duplicate trait and visual checker",
  "OpenSea-compatible metadata",
  "IPFS upload via Pinata",
  "ERC-721A smart contract export",
  "Deployable mint site generator",
  "Stripe subscriptions + usage analytics",
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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-24 text-white">
      <section id="live-demo" className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h2 className="text-2xl font-bold">Live demo</h2>
          <p className="mt-3 text-slate-200">
            Input one sentence and watch AI NFT Collection Generator produce concept, traits, rarity profile, and first 20 preview
            images in real time.
          </p>
        </GlassCard>
        <GlassCard>
          <h2 className="text-2xl font-bold">Feature coverage</h2>
          <ul className="mt-3 grid gap-2 text-slate-200">
            {features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </GlassCard>
      </section>

      <section id="pricing" className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h3 className="text-2xl font-bold">Free</h3>
          <p className="mt-2 text-slate-200">Up to 25 NFTs, watermarked previews, and basic metadata.</p>
          <p className="mt-4 text-4xl font-black">$0</p>
        </GlassCard>
        <GlassCard className="border-amber-300/40">
          <h3 className="text-2xl font-bold">Pro</h3>
          <p className="mt-2 text-slate-200">Up to 10,000 NFTs, HD art, IPFS, contracts, mint site, and more.</p>
          <p className="mt-4 text-4xl font-black">$49/mo</p>
        </GlassCard>
      </section>

      <section id="faq" className="grid gap-6 lg:grid-cols-3">
        {faqs.map((faq) => (
          <GlassCard key={faq.q}>
            <h4 className="text-lg font-bold">{faq.q}</h4>
            <p className="mt-2 text-slate-200">{faq.a}</p>
          </GlassCard>
        ))}
      </section>

      <section id="testimonials" className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <GlassCard key={item.by}>
            <p className="text-slate-100">“{item.quote}”</p>
            <p className="mt-3 text-sm text-amber-200">{item.by}</p>
          </GlassCard>
        ))}
      </section>
    </div>
  );
}
