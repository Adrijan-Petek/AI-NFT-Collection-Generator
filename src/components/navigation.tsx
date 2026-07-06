import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="text-lg font-black tracking-wide">
          AI NFT Collection Generator
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-200">
          <Link href="#pricing">Pricing</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="/dashboard">Dashboard</Link>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-lg border border-white/20 px-3 py-1">Log in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
