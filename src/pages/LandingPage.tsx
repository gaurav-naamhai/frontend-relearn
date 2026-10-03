import {
  ArrowRight,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface LandingPageProps {
  onStartLearning: () => void;
  onExploreDemo: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onExploreDemo,
  onLogin,
}) => {
  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 bg-[#0b0f17]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
            RE
          </div>
          <span className="font-extrabold font-mono tracking-wider text-base">
            RE:LEARN
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={onLogin}
            className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 font-medium transition-colors"
          >
            Log In
          </button>
          <button
            onClick={onStartLearning}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            Start Learning
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>The First Cognitive-Diagnosis Python Tutor</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Learn programming by{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            understanding your mistakes.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Re:Learn does not just tell you your code is wrong. It finds the misconception
          behind your mistake, teaches the mental model, checks whether it actually stuck,
          and remembers it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
          >
            See How It Works (Live Demo)
          </button>
        </div>

        {/* Cognitive Loop Flow Ribbon */}
        <div className="pt-10">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-slate-400">
            <span className="text-slate-200 font-semibold">Code Attempt</span>
            <span>→</span>
            <span className="text-amber-400 font-semibold">Line-Level Error</span>
            <span>→</span>
            <span className="text-indigo-400 font-semibold">AI Diagnosis</span>
            <span>→</span>
            <span className="text-purple-400 font-semibold">Targeted Practice</span>
            <span>→</span>
            <span className="text-cyan-400 font-semibold">Transfer Reassessment</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Provisional Mastery</span>
          </div>
        </div>
      </section>

      {/* Comparison Section (Section 4: Not just "Wrong Answer") */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Not just "Wrong Answer"
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Traditional platforms treat mistakes as failures. Generative AI gives the answer away.
            Re:Learn builds understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Traditional */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Traditional Platforms
            </div>
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 font-mono text-xs text-rose-300 space-y-1">
              <div className="font-bold">❌ Wrong Answer</div>
              <div className="text-slate-400">Test failed on input (5, 3). Try again.</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides zero insight into why the logic failed. Learners resort to trial-and-error guessing.
            </p>
          </div>

          {/* Card 2: AI wrapper */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              Generic AI Explanation
            </div>
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 font-mono text-xs text-indigo-300 space-y-1">
              <div className="font-bold">❌ Your answer is incorrect.</div>
              <div className="text-slate-400">Here's the corrected code for you to paste...</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Robbing the learner of cognitive struggle by handing over the solution before understanding forms.
            </p>
          </div>

          {/* Card 3: Re:Learn */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-indigo-500/60 shadow-xl shadow-indigo-950/40 space-y-4 relative">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Re:Learn Cognitive Tutor
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 font-mono">
                Cognitive Model
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 font-mono text-xs text-amber-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" /> Conceptual Misconception
              </div>
              <div className="text-slate-300 text-xs font-sans">
                You are treating <code>print()</code> as if it returns a value to the caller.
              </div>
              <div className="text-indigo-300 text-[11px] font-mono">
                Let's test that belief with a transfer challenge.
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Finds the underlying flawed belief, tests it with diagnostic probes, and checks retention.
            </p>
          </div>
        </div>
      </section>

      {/* Product Pillars */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How The Re:Learn Loop Works
          </h2>
          <p className="text-slate-400 text-sm">
            Diagnose → Teach → Reassess → Remember
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center font-bold text-xs font-mono">
              01
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Line-Level Diagnosis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We highlight the exact code lines and classify whether the mistake is syntax, runtime, a careless slip, or a conceptual misconception.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center font-bold text-xs font-mono">
              02
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Diagnostic Probes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Look-alike mistakes are verified with targeted micro-questions, ensuring careless typos are never confused with deep misunderstandings.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono">
              03
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Transfer Reassessment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solving the original problem is not enough. We present new-looking transfer problems to confirm true conceptual mastery.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
              04
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Spaced Delayed Check</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provisional mastery is periodically re-checked to ensure concepts stay consolidated in long-term memory.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full text-center space-y-5 my-10 p-10 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-800/40">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Start learning Python differently.
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto">
          Experience programming where every mistake is an intelligent clue toward true mastery.
        </p>
        <button
          onClick={onStartLearning}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white shadow-xl shadow-indigo-600/30 transition-transform hover:scale-105"
        >
          Launch Re:Learn Prototype →
        </button>
      </section>
    </div>
  );
};
