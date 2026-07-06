export default function ApiDocsPage() {
  const docs = [
    { method: "POST", path: "/api/tools/register", purpose: "Generate ERC-8257 registry payload for OpenSea tool registration" },
    { method: "POST", path: "/api/pro/access", purpose: "Verify wallet NFT/token gate on Base" },
    { method: "GET", path: "/api/projects", purpose: "List user projects" },
    { method: "POST", path: "/api/projects", purpose: "Create project" },
    { method: "POST", path: "/api/generate", purpose: "Generate draft + preview NFTs" },
    { method: "POST", path: "/api/ipfs/upload", purpose: "Upload metadata/images references" },
    { method: "POST", path: "/api/contracts/generate", purpose: "Generate ERC-721A source" },
    { method: "POST", path: "/api/mint-site/generate", purpose: "Generate deployable mint page" },
    { method: "POST", path: "/api/billing/checkout", purpose: "Start Stripe subscription checkout" },
  ];

  return (
    <main className="min-h-screen bg-[#030712] px-6 py-12 text-white">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-black">API Documentation</h1>
        <p className="text-slate-300">Core endpoints for the AI NFT Collection Generator platform.</p>
        <div className="overflow-x-auto rounded-xl border border-white/20">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Path</th>
                <th className="px-4 py-3">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((entry) => (
                <tr key={entry.path} className="border-t border-white/10">
                  <td className="px-4 py-3 font-bold text-amber-200">{entry.method}</td>
                  <td className="px-4 py-3">{entry.path}</td>
                  <td className="px-4 py-3 text-slate-300">{entry.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
