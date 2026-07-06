"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { base, mainnet, polygon } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "AI NFT Collection Generator",
  projectId: "ai-nft-collection-generator",
  chains: [base, mainnet, polygon],
  ssr: true,
});

const queryClient = new QueryClient();

const defaultChain =
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN === "polygon"
    ? polygon
    : process.env.NEXT_PUBLIC_DEFAULT_CHAIN === "ethereum"
      ? mainnet
      : base;

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={defaultChain}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
