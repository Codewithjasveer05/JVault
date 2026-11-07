import "dotenv/config";
import express from "express";
import { handleChat } from "./chat.js";

const app = express();
app.use(express.json({ limit: "20kb" }));

// Very simple rate limit: 20 messages per minute per IP.
const hits = new Map();
app.use("/api/chat", (req, res, next) => {
  const now = Date.now();
  const list = (hits.get(req.ip) || []).filter((t) => now - t < 60000);
  if (list.length >= 20) return res.status(429).json({ error: "Too many messages, please wait a minute." });
  list.push(now);
  hits.set(req.ip, list);
  next();
});

app.post("/api/chat", async (req, res) => {
  try {
    const reply = await handleChat(req.body?.messages, req.body?.customerName);
    res.json({ reply });
  } catch (e) {
    console.error("[bot] error:", e.message);
    res.status(500).json({ error: "Sorry, the assistant is busy right now. Please try again in a moment." });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Bot server running on http://localhost:${port}`));