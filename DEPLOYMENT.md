# Full Deployment Guide

This guide puts AI NFT Collection Generator fully online with:

- Frontend/API hosting: Vercel
- Database: Neon PostgreSQL
- Auth: Clerk
- Billing fallback: Stripe
- IPFS: Pinata
- Onchain tooling: OpenSea ERC-8257 flow on Base

## 1. Prerequisites

- GitHub repository already pushed
- Vercel account connected to GitHub
- Neon account
- Clerk account
- Stripe account
- Pinata account
- Base RPC provider URL

## 2. Provision Managed PostgreSQL (Neon)

1. Create a Neon project.
2. Create database named `ai_nft_collection_generator`.
3. Copy connection string and ensure `sslmode=require`.
4. Save as `DATABASE_URL` in Vercel project env vars.

## 3. Configure Clerk

1. Create Clerk application.
2. Add production domain(s) in Clerk dashboard.
3. Copy keys:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## 4. Configure Stripe (fallback billing)

1. Create a monthly recurring product/price.
2. Copy values:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRICE_PRO_MONTHLY`
3. Create webhook endpoint:
- `https://<your-domain>/api/webhooks/stripe`
4. Subscribe to `checkout.session.completed`.
5. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

## 5. Configure Pinata

1. Create API JWT token.
2. Set:
- `PINATA_JWT`
- `PINATA_GATEWAY` (optional, default supported)

## 6. Configure Blockchain + OpenSea vars

Set in Vercel:

- `NEXT_PUBLIC_DEFAULT_CHAIN=base`
- `BASE_RPC_URL=<your-base-rpc-url>`
- `ETHEREUM_RPC_URL=<optional-rpc-url>`
- `POLYGON_RPC_URL=<optional-rpc-url>`
- `PRIVATE_KEY=<deploy-key-or-empty>`
- `OPENSEA_TOOL_NAME=AI NFT Collection Generator Pro Tool`
- `OPENSEA_TOOL_DESCRIPTION=Onchain-gated NFT generation tool`
- `OPENSEA_TOOL_ENDPOINT=https://<your-domain>/api/generate`
- `OPENSEA_TOOL_OWNER=0x868EDB819AF54a9C938DEA4c2e027FE050b18d0A`
- `PRO_NFT_GATE=<nft-contract-or-zero-address>`
- `PRO_MIN_NFT_BALANCE=1`
- `PRO_TOKEN_GATE=<token-contract-or-zero-address>`
- `PRO_MIN_TOKEN_BALANCE=0`
- `PRO_PAY_PER_CALL_WEI=0`

## 7. Deploy to Vercel

1. Import GitHub repo into Vercel.
2. Framework preset: Next.js.
3. Add all environment variables from section 2-6.
4. Deploy.

## 8. Run Prisma Migration Against Production

Use Vercel project shell or local shell with production `DATABASE_URL` exported:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

## 9. Verify Critical Routes

- `/` landing page
- `/dashboard`
- `/pricing`
- `/api-docs`
- `/api/projects` (auth required)
- `/api/generate` (wallet gate for >25 NFTs)
- `/api/webhooks/stripe` (webhook receives events)

## 10. Register OpenSea Tool Onchain (Base)

From repository root:

```bash
npm run opensea:payload
```

Then use your prompt:

Use the opensea-tool-sdk skill to scaffold and register my tool onchain on Base.

Use generated file:

- `opensea-tool-registration.json`

## 11. GitHub Pages (Static Marketing Page)

The static page is already configured via GitHub Actions workflow.

Enable once:

1. GitHub repo -> Settings -> Pages
2. Source: GitHub Actions
3. Push to `main`

Live static URL:

- `https://Adrijan-Petek.github.io/AI-NFT-Collection-Generator/`

## 12. Final Go-Live Checklist

- [ ] Vercel deployment healthy
- [ ] Clerk login works in production domain
- [ ] Stripe checkout + webhook verified
- [ ] Pinata upload verified
- [ ] Prisma migration applied to production DB
- [ ] OpenSea tool registration completed on Base
- [ ] Wallet gate check behaves correctly for Pro generation
- [ ] Static GitHub Pages info page live
