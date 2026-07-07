import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { LandingSections } from "@/components/landing/sections";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07111f]">
      <Navigation />
      <Hero />
      <LandingSections />
      <section className="mx-auto mb-14 flex w-full max-w-6xl flex-col items-start justify-between gap-4 rounded-3xl border border-slate-100/15 bg-slate-100/5 px-5 py-8 text-white md:flex-row md:items-center md:px-8">
        <div>
          <p className="kicker">Launch Ready</p>
          <p className="mt-1 text-xl font-bold text-white md:text-2xl">Turn concept into collection infrastructure.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button className="px-5 py-2.5">Open Dashboard</Button>
          </Link>
          <Link href="/api-docs">
            <Button variant="secondary" className="px-5 py-2.5">
              API Docs
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
