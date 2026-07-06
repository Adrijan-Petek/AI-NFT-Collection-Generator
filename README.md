# AI NFT Collection Generator

AI NFT Collection Generator is a full-stack SaaS platform that turns natural language prompts into production-ready NFT collections.

## What it generates

- Collection concept, narrative, mission, and utility copy
- Trait categories and values with rarity distribution
- NFT metadata (OpenSea compatible)
- Preview assets (first 20 items)
- Duplicate-trait detection signals
- ERC-721A contract source
- Deployable mint-site HTML
- IPFS metadata upload flow via Pinata

## Core stack

- Frontend: Next.js 16, React 19, Tailwind CSS 4, TypeScript
- Backend: Next.js API routes
- Database: PostgreSQL + Prisma ORM
- Auth: Clerk
- Payments: OpenSea ERC-8257 onchain tool gating + optional Stripe fallback
- Storage: Pinata IPFS
- Blockchain: Solidity + OpenZeppelin + ERC721A + Hardhat
- Wallet: RainbowKit + Wagmi (Base, Ethereum, Polygon)
- Tests: Vitest
- Infra: Docker + docker-compose

## Project structure

- src/app: app routes and API handlers
- src/components: landing, dashboard, and shared UI components
- src/lib: domain logic (AI generation, rarity, contract templates, IPFS, Stripe, auth)
- prisma: schema and seed scripts
- contracts: Solidity contracts
- test: unit tests

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Configure .env values for:
- DATABASE_URL
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_PRO_MONTHLY
- PINATA_JWT
- OPENSEA_TOOL_ENDPOINT, OPENSEA_TOOL_OWNER
- PRO_NFT_GATE / PRO_TOKEN_GATE / PRO_PAY_PER_CALL_WEI

4. Run Prisma:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

5. Start app:

```bash
npm run dev
```

6. Open:
- http://localhost:3000 landing page
- /dashboard project creation and generation
- /admin admin panel
- /api-docs endpoint overview

## Docker

```bash
docker compose up --build
```

## Generation workflow

1. User creates a project in dashboard with prompt + collection settings.
2. Main Pro path: register your HTTPS endpoint in ERC-8257 on Base.
3. Configure NFT/token gate and optional pay-per-call policy.
4. /api/generate validates wallet access onchain for >25 NFT jobs.
5. If gate passes, generation builds collection draft and preview metadata.
6. User can trigger:
- /api/contracts/generate for ERC-721A source
- /api/mint-site/generate for deployable mint page
- /api/ipfs/upload for metadata pinning
7. Stripe checkout remains as fallback billing path.

## OpenSea registration flow

1. Install skill:

```bash
npx skills add ProjectOpenSea/opensea-skill
```

2. Generate payload in this project:

```bash
npm run opensea:payload
```

3. Register on Base using the skill + SDK flow with generated payload.
4. Prompt your coding agent: "Use the opensea-tool-sdk skill to scaffold and register my tool onchain on Base."

## Marketplace compatibility

Metadata format follows OpenSea-compatible conventions:
- name
- description
- image
- attributes[]
- collection-level references

Compatible target marketplaces:
- OpenSea
- Blur
- Magic Eden (on supported EVM chains)

## Security and production notes

- Route protection uses Clerk middleware for dashboard and project APIs.
- Env validation with Zod (src/lib/env.ts).
- Add rate-limits and background queues before production scale.
- Use signed uploads and server-side image pipelines for large batch generation.

## Current implementation status

Implemented:
- SaaS landing page (glassmorphism dark mode)
- Authenticated dashboard with create/list/delete/duplicate/continue flows
- AI draft + rarity + duplicate checker foundation
- Metadata and export pipelines (IPFS / contract / mint site)
- Admin analytics endpoint and dashboard
- Unit tests, Docker, Prisma schema

Suggested next milestone:
- Integrate real image generation provider and queue workers for 10k scale rendering.
