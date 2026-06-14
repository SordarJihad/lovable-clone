import Link from "next/link";
import { Sparkles, Zap, Code2, Layers, Rocket, Wand2, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Prompt to product",
    desc: "Describe your idea in plain English. Forge writes the full React + Tailwind codebase for you.",
  },
  {
    icon: Zap,
    title: "Live preview, instantly",
    desc: "Watch your site render in real time as the AI builds it — no setup, no waiting.",
  },
  {
    icon: Code2,
    title: "Full code ownership",
    desc: "Every component is real, editable code. Export it, push it to GitHub, or deploy in one click.",
  },
  {
    icon: Layers,
    title: "Iterate with chat",
    desc: "Ask for changes like you would a designer — 'make the hero darker' — and watch it update live.",
  },
];

const steps = [
  { n: "01", title: "Describe your idea", desc: "Type a prompt like “a landing page for my AI fitness app”." },
  { n: "02", title: "Watch it build", desc: "Forge generates components, styles and layout in seconds." },
  { n: "03", title: "Refine & deploy", desc: "Chat to tweak details, then ship straight to the web." },
];

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-cyan-500/20 blur-3xl animate-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Forge</span>
        </div>
        <div className="hidden sm:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <Link
          href="/build"
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 transition-colors"
        >
          Start building
        </Link>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-28 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300 mb-8">
          <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
          Powered by Claude — the future of AI website building
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          Build stunning websites
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            just by chatting
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Forge turns your ideas into production-ready, fully editable code in seconds.
          No design skills, no setup — just describe what you want and watch it come to life.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/build"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-3.5 text-base font-medium text-white shadow-[0_0_40px_-10px_rgba(168,85,247,0.8)] hover:shadow-[0_0_60px_-10px_rgba(168,85,247,1)] transition-shadow"
          >
            Start building for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-base font-medium text-zinc-200 hover:bg-white/5 transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Preview mockup */}
        <div className="mt-20 w-full">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-2 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              <div className="ml-3 flex-1 rounded-md bg-white/5 px-3 py-1 text-left text-xs text-zinc-500">
                forge.app/build
              </div>
            </div>
            <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/5 flex items-center justify-center">
              <div className="text-center px-8">
                <Rocket className="mx-auto h-10 w-10 text-fuchsia-400 mb-4" />
                <p className="text-zinc-400 text-sm">Your generated site appears here, live, as you chat.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="relative z-10 px-6 py-24 max-w-6xl mx-auto w-full">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold tracking-tight">
          Everything you need to ship fast
        </h2>
        <p className="mt-4 text-center text-zinc-400 max-w-xl mx-auto">
          Forge handles the heavy lifting so you can focus on your idea, not the boilerplate.
        </p>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5 text-fuchsia-300" />
              </div>
              <h3 className="text-base font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 px-6 py-24 max-w-5xl mx-auto w-full">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold tracking-tight">
          From idea to live site in 3 steps
        </h2>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="text-4xl font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="relative z-10 px-6 py-28 max-w-4xl mx-auto w-full text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 p-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Ready to build something amazing?
          </h2>
          <p className="mt-4 text-zinc-400">
            Start for free. No credit card required.
          </p>
          <Link
            href="/build"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:bg-zinc-200 transition-colors"
          >
            Launch Forge
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Forge. Built with Claude.
      </footer>
    </div>
  );
}
