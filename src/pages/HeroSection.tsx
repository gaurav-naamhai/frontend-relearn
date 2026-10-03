import React from "react";
import {
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Cpu,
  Layers,
  CheckCircle2,
  Search,
} from "lucide-react";
import { MacbookShowcase } from "../components/macbook/MacbookShowcase";

interface HeroSectionProps {
  onStartLearning: () => void;
  onGoToDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onGoToDashboard,
}) => {
  return (
    <div className="w-full bg-background text-foreground flex flex-col">
      {/* ================================================== */}
      {/* 1. EXISTING HERO SECTION                           */}
      {/* ================================================== */}
      <section className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center px-6 py-16 border-b border-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs font-mono text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-chart-1" />
            <span>Adaptive Python Programming Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Learn programming by{" "}
            <span className="text-chart-2">understanding your mistakes.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Re:Learn does not just tell you that your code is wrong. It diagnoses the conceptual
            misconception behind your mistake, explains it line by line, and verifies that you understand it.
          </p>

          {/* Existing Start Learning & Dashboard CTAs (Unchanged) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToDashboard}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-card hover:bg-muted border border-border text-foreground font-semibold text-sm transition-colors"
            >
              View Fundamentals Dashboard
            </button>
          </div>

          {/* Minimal Process Flow Preview */}
          <div className="pt-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-card border border-border flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="text-foreground">1. Problem Prompt</span>
              <span>→</span>
              <span className="text-foreground">2. Type Code</span>
              <span>→</span>
              <span className="text-chart-2 font-semibold">3. Compile &amp; Run</span>
              <span>→</span>
              <span className="text-chart-1 font-semibold">4. Line-by-Line Insight</span>
              <span>→</span>
              <span className="text-emerald-400 font-semibold">5. Optional Practice</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. MACBOOK SHOWCASE — CENTERED IMMEDIATELY BELOW   */}
      {/*    START LEARNING / HERO SECTION                  */}
      {/* ================================================== */}
      <MacbookShowcase />

      {/* ================================================== */}
      {/* 3. EXISTING REMAINING HOME CONTENT                 */}
      {/*    (MOVED BELOW THE MACBOOK SHOWCASE)             */}
      {/* ================================================== */}

      {/* Comparison Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full border-b border-border">
        <div className="space-y-2 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <Cpu className="w-3.5 h-3.5 text-chart-2" />
            <span>Paradigm Comparison</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight font-mono">
            Beyond "Wrong Answer"
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl">
            How Re:Learn differs fundamentally from traditional automated judges and generic AI wrappers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Traditional Judges */}
          <div className="p-5 rounded-xl bg-card border border-border space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
                Traditional Platforms
              </div>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 font-mono text-xs text-destructive space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <span>❌</span> Wrong Answer
                </div>
                <div className="text-muted-foreground text-[11px]">
                  Test failed on input (5, 3). Output mismatch.
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Provides zero structural insight into logic failures. Encourages blind trial-and-error guessing without building deep mental models.
              </p>
            </div>
            <div className="text-[11px] font-mono text-muted-foreground pt-2 border-t border-border">
              Outcome: Guesswork &amp; Frustration
            </div>
          </div>

          {/* Generic AI Wrappers */}
          <div className="p-5 rounded-xl bg-card border border-border space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
                Generic AI Wrapper
              </div>
              <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/20 font-mono text-xs text-chart-2 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <span>⚡</span> Code Correction
                </div>
                <div className="text-muted-foreground text-[11px]">
                  Here is the corrected solution code to copy...
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dumps the final answer without cognitive struggle, bypassing genuine mental model formation and retention.
              </p>
            </div>
            <div className="text-[11px] font-mono text-muted-foreground pt-2 border-t border-border">
              Outcome: Illusion of Competence
            </div>
          </div>

          {/* Re:Learn Cognitive Engine */}
          <div className="p-5 rounded-xl bg-card border border-chart-2/50 shadow-sm space-y-3.5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-chart-2/5 rounded-bl-full pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-wider text-chart-2 font-bold">
                  Re:Learn Cognitive Model
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-chart-2/15 text-chart-2 border border-chart-2/30 font-mono font-bold">
                  Line 2 AST Fault
                </span>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 font-mono text-xs text-amber-500 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Conceptual Misconception
                </div>
                <div className="text-foreground text-[11px] font-sans">
                  Treating <code className="bg-muted px-1 py-0.5 rounded font-mono text-amber-400">print()</code> as if it delivers a return value to caller variable.
                </div>
              </div>

              <p className="text-xs text-foreground leading-relaxed">
                Isolates the root belief, validates with diagnostic micro-probes, and confirms retention through transfer challenges.
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 font-bold pt-2 border-t border-border flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Outcome: True Conceptual Mastery</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Cognitive Loop */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full border-b border-border">
        <div className="space-y-2 mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <Layers className="w-3.5 h-3.5 text-chart-1" />
            <span>Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight font-mono">
            The 4-Step Cognitive Loop
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm font-mono">
            Diagnose → Disambiguate → Reassess → Retain
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-2.5 hover:border-chart-2/40 transition-colors">
            <div className="text-xs font-mono font-bold text-chart-2">
              01 // AST Diagnosis
            </div>
            <h3 className="font-bold text-foreground text-sm font-mono">Line-Level Fault</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pinpoints exact lines and classifies errors into syntax, runtime, slips, or mental misconceptions.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-2.5 hover:border-chart-2/40 transition-colors">
            <div className="text-xs font-mono font-bold text-chart-1">
              02 // Cognitive Probe
            </div>
            <h3 className="font-bold text-foreground text-sm font-mono">Look-Alike Disambiguation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Discriminates between look-alike bugs using targeted micro-probes, preventing false-positive reteaching.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-2.5 hover:border-chart-2/40 transition-colors">
            <div className="text-xs font-mono font-bold text-emerald-400">
              03 // Transfer Test
            </div>
            <h3 className="font-bold text-foreground text-sm font-mono">Targeted Reassessment</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Validates whether concepts generalize into fresh problem contexts rather than memorized solutions.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-2.5 hover:border-chart-2/40 transition-colors">
            <div className="text-xs font-mono font-bold text-purple-400">
              04 // Memory Trace
            </div>
            <h3 className="font-bold text-foreground text-sm font-mono">Spaced Re-Check</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Periodically verifies consolidated memory retention before graduating misconceptions to resolved.
            </p>
          </div>
        </div>
      </section>

      {/* Engine Architecture Highlights */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <Search className="w-3.5 h-3.5 text-chart-2" />
              <span>Architectural Precision</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight font-mono">
              Designed for Deliberate Practice &amp; Deep Intuition
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every interaction is modeled as a cognitive state transition. Rather than giving you boilerplate answers, Re:Learn builds the internal debugger in your mind.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero guesswork: deterministic AST line analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bayesian misconception belief updating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automated spaced retention probes</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border text-muted-foreground text-[11px]">
              <span>DIAGNOSTIC TRACE SUMMARY</span>
              <span className="text-emerald-400 font-bold">PYTHON 3.12</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Misconception:</span>
                <span className="text-chart-2 font-bold">return-vs-print</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence Score:</span>
                <span className="text-foreground font-bold">98.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Probe Disambiguation:</span>
                <span className="text-emerald-400 font-bold">PASSED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transfer Challenge:</span>
                <span className="text-emerald-400 font-bold">VERIFIED</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/60 text-[11px] text-muted-foreground leading-relaxed">
              "When you return a value, it flows back to the caller. When you print, it flows to the screen."
            </div>
          </div>
        </div>
      </section>

      {/* END OF HOME PAGE */}
    </div>
  );
};
