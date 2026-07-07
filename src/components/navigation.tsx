import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { hasValidClerkConfig } from "@/lib/clerk";

export function Navigation() {
  const authEnabled = hasValidClerkConfig();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-[#07111f]/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 text-white md:px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200/80">AI NFT Studio</span>
          <span className="text-base font-black tracking-wide md:text-lg">Collection Generator</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-slate-200 md:gap-4">
          <Link href="#capabilities" className="hidden rounded-md px-2 py-1 transition hover:text-white md:block">
            Capabilities
          </Link>
          <Link href="#pricing" className="hidden rounded-md px-2 py-1 transition hover:text-white md:block">
            Pricing
          </Link>
          <Link href="#faq" className="hidden rounded-md px-2 py-1 transition hover:text-white md:block">
            FAQ
          </Link>
          <Link href="/dashboard" className="rounded-md px-2 py-1 transition hover:text-white">
            Dashboard
          </Link>
          {authEnabled ? (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200/30 bg-slate-200/10 px-3 py-1.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-200/20">
                    Log in
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <span className="rounded-lg border border-slate-200/20 px-3 py-1.5 text-xs text-slate-300 md:text-sm">
              Auth not configured
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
