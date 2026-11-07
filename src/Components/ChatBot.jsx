import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { CustomerContext } from "../context/CustomerContext.jsx";

// Turns /product/handle into a "View product" link and **bold** into bold.
function renderText(text) {
  const parts = text.split(/(\/product\/[a-z0-9-]+|\*\*[^*]+\*\*)/gi);
  return parts.map((part, i) => {
    if (/^\/product\/[a-z0-9-]+$/i.test(part)) {
      return (
        <Link key={i} to={part} className="underline font-semibold text-red-500">
          View product →
        </Link>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    return part;
  });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const { loggedIn, customer } = useContext(CustomerContext);
  const firstName = loggedIn ? customer?.firstName : "";

  const greeting = firstName
    ? `Hi ${firstName}! 👋 Welcome back. Ask me about products, prices, stock or shipping.`
    : "Hi! 👋 I'm the JVault assistant. Ask me about products, prices, stock or shipping. Login to add items to your cart.";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // New chat when a different person logs in or out
  useEffect(() => {
    setMessages([]);
  }, [firstName]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, customerName: firstName || "" }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || data.error || "Something went wrong." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "I can't connect right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[32rem] max-h-[75vh] flex flex-col rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold"><FaRobot /> JVault Assistant</div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><FaTimes /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-bl-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                {greeting}
              </div>
            </div>

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-red-500 text-white rounded-br-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-bl-sm"
                }`}>
                  {renderText(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 px-3 py-2 rounded-2xl animate-pulse">Typing…</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={send} className="border-t border-gray-200 dark:border-gray-700 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, shipping…"
              maxLength={500}
              className="flex-1 px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white text-sm outline-none focus:border-red-500"
            />
            <button type="submit" disabled={loading || !input.trim()} className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center disabled:opacity-50" aria-label="Send">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-red-500 text-white text-2xl flex items-center justify-center shadow-xl hover:scale-105 transition"
      >
        {open ? <FaTimes /> : <FaRobot />}
      </button>
    </>
  );
}