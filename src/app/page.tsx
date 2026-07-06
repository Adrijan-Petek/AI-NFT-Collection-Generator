import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { LandingSections } from "@/components/landing/sections";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Navigation />
      <Hero />
      <LandingSections />
      <section className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 pb-16">
        <p className="text-slate-300">Ready to launch your collection?</p>
        <div className="flex gap-3">
          <Link href="/dashboard">
            <Button>Open Dashboard</Button>
          </Link>
          <Link href="/api-docs">
            <Button variant="secondary">API Docs</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
