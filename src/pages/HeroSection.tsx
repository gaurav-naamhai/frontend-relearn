import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartLearning: () => void;
  onGoToDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onGoToDashboard,
}) => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#070a10] text-slate-100 flex flex-col justify-center items-center px-6 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Adaptive Python Programming Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Learn programming by{" "}
          <span className="text-indigo-400">understanding your mistakes.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Re:Learn does not just tell you that your code is wrong. It diagnoses the conceptual
          misconception behind your mistake, explains it line by line, and verifies that you understand it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white shadow-lg shadow-indigo-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onGoToDashboard}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-sm transition-colors"
          >
            View Fundamentals Dashboard
          </button>
        </div>

        {/* Minimal Process Flow Preview */}
        <div className="pt-12 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span className="text-slate-200">1. Problem Prompt</span>
            <span>→</span>
            <span className="text-slate-200">2. Type Code</span>
            <span>→</span>
            <span className="text-indigo-400 font-semibold">3. Compile & Run</span>
            <span>→</span>
            <span className="text-amber-400 font-semibold">4. Line-by-Line Insight</span>
            <span>→</span>
            <span className="text-emerald-400 font-semibold">5. Optional Practice</span>
          </div>
        </div>
      </div>
    </div>
  );
};
