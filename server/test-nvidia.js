// Run:  npm run test:bot     -> checks your key + the main model + speed
import "dotenv/config";

const model = process.env.NVIDIA_MODEL || "google/diffusiongemma-26b-a4b-it";
for (let i = 1; i <= 3; i++) {
  const t = Date.now();
  try {
    const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: [{ role: "user", content: "Say hello in one short sentence." }], max_tokens: 50 }),
    });
    const j = await res.json();
    console.log(`Test ${i}: ${res.status} in ${((Date.now() - t) / 1000).toFixed(1)}s ->`, j.choices?.[0]?.message?.content || JSON.stringify(j).slice(0, 200));
  } catch (e) {
    console.log(`Test ${i}: FAILED`, e.message);
  }
}