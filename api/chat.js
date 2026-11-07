// Only needed if you deploy on Vercel (it turns this file into /api/chat automatically).
import { handleChat } from "../server/chat.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const reply = await handleChat(req.body?.messages, req.body?.customerName);
    res.status(200).json({ reply });
  } catch (e) {
    console.error("[bot] error:", e.message);
    res.status(500).json({ error: "Sorry, the assistant is busy right now. Please try again in a moment." });
  }
}