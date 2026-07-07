import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { hasValidClerkConfig } from "@/lib/clerk";

export function Navigation() {
  const authEnabled = hasValidClerkConfig();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-[#07111f]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-1 text-white md:px-6">
        <Link href="/" className="group flex items-center gap-3 leading-none">
          <Image
            src="/logo2.png"
            alt="logo"
            width={76}
            height={76}
            className="rounded-xl shrink-0 transition-opacity duration-200 group-hover:opacity-90"
          />
          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-400">AI NFT Studio</span>
            <span className="text-[15px] font-black tracking-[-0.03em] text-white">Collection Generator</span>
          </div>
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
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200/30 bg-slate-200/10 px-3 py-1.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-200/20">
                    Log in
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
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
