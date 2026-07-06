type MintSiteInput = {
  collectionName: string;
  mintDateISO: string;
  roadmap: string[];
  faq: Array<{ q: string; a: string }>;
};

export function buildMintSiteHTML(input: MintSiteInput) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${input.collectionName} Mint</title>
<style>
body { margin:0; font-family: 'Space Grotesk', sans-serif; background:#070b14; color:#d6e2ff; }
.container { max-width: 1080px; margin: 0 auto; padding: 24px; }
.card { background: rgba(255,255,255,0.08); backdrop-filter: blur(12px); border:1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 20px; margin-bottom: 16px; }
button { padding: 12px 20px; border: none; border-radius: 10px; background: linear-gradient(135deg,#34d399,#0ea5e9); color:#021225; font-weight:700; cursor:pointer; }
.grid { display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); }
</style>
</head>
<body>
<div class="container">
  <h1>${input.collectionName}</h1>
  <div class="card">
    <h2>Mint Countdown</h2>
    <p id="countdown">Loading...</p>
    <button id="connectWallet">Connect Wallet</button>
    <button id="mintBtn">Mint</button>
    <p>Remaining Supply: <span id="remaining">--</span></p>
  </div>
  <div class="grid">
    <div class="card"><h3>Roadmap</h3><ul>${input.roadmap.map((item) => `<li>${item}</li>`).join("")}</ul></div>
    <div class="card"><h3>FAQ</h3>${input.faq.map((item) => `<p><strong>${item.q}</strong><br/>${item.a}</p>`).join("")}</div>
    <div class="card"><h3>Team</h3><p>Founder, Artist, Smart Contract Engineer, Community Lead.</p></div>
  </div>
</div>
<script>
const launchDate = new Date("${input.mintDateISO}").getTime();
const countdownEl = document.getElementById("countdown");
setInterval(() => {
  const diff = launchDate - Date.now();
  if (diff <= 0) {
    countdownEl.textContent = "Mint is live";
    return;
  }
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  countdownEl.textContent = hours + "h " + mins + "m " + secs + "s";
}, 1000);
</script>
</body>
</html>`;
}
