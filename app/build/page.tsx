"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Sparkles, Send, Loader2, Code2, Eye } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const DEFAULT_CODE = `export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Your site will appear here
        </h1>
        <p className="text-zinc-400">
          Describe what you want to build in the chat on the left, and Forge
          will generate it live in this preview.
        </p>
      </div>
    </div>
  );
}
`;

export default function BuildPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! Tell me what kind of website you want to build, e.g. \"a landing page for a coffee subscription brand\".",
    },
  ]);
  const [input, setInput] = useState("");
  const [code, setCode] = useState(DEFAULT_CODE);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const prompt = input.trim();
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          currentCode: code === DEFAULT_CODE ? null : code,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages((m) => [...m, { role: "assistant", content: `Error: ${data.error}` }]);
      } else {
        setCode(data.code);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Done! I've updated the live preview on the right." },
        ]);
        setTab("preview");
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong generating your site. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#050507]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">Forge</span>
        </Link>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
          <button
            onClick={() => setTab("preview")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
              tab === "preview" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
              tab === "code" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" /> Code
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat sidebar */}
        <div className="flex w-full max-w-md flex-col border-r border-white/10">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                    : "bg-white/5 text-zinc-200 border border-white/10"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-400 w-fit">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating your site...
              </div>
            )}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Describe your website or request a change..."
                rows={2}
                className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-zinc-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:opacity-40 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview / code */}
        <div className="flex-1 overflow-hidden">
          <Sandpack
            theme="dark"
            template="react-ts"
            files={{
              "/App.tsx": code,
            }}
            customSetup={{
              dependencies: {
                "lucide-react": "latest",
              },
            }}
            options={{
              showTabs: tab === "code",
              showLineNumbers: tab === "code",
              showConsole: false,
              editorWidthPercentage: tab === "code" ? 50 : 0,
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
          />
        </div>
      </div>
    </div>
  );
}
