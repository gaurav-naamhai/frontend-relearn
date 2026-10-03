import React, { useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Brain,
  MessageSquare,
  Activity,
  ArrowRight,
  HelpCircle,
  Layers,
} from "lucide-react";
import { Diagnosis } from "../../types";
import { Badge } from "../common/Badge";

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  onOpenProbe: () => void;
  onOpenTrace: () => void;
  onScrollToChat: () => void;
  onStartReassessment: () => void;
  hasAnsweredProbe: boolean;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({
  diagnosis,
  onOpenProbe,
  onOpenTrace,
  onScrollToChat,
  onStartReassessment,
  hasAnsweredProbe,
}) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);

  return (
    <div className="rounded-xl border border-amber-500/40 bg-gradient-to-b from-[#1c1815] to-[#121620] p-4 text-xs text-slate-200 shadow-xl shadow-black/50 space-y-3.5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-amber-900/40 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge type={diagnosis.errorType} label="Conceptual Misconception" />
            <span className="font-mono text-[11px] text-amber-400 font-semibold">
              Line {diagnosis.affectedLines.join(", ")}
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            {diagnosis.primaryMisconceptionName}
          </h4>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 font-mono">AI Confidence</div>
          <div className="text-sm font-mono font-bold text-amber-400">
            {diagnosis.confidence}%
          </div>
        </div>
      </div>

      {/* Code Snippet Highlight */}
      <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] text-amber-300 flex items-center justify-between">
        <span>Line {diagnosis.affectedLines[0] || 2}: {diagnosis.faultyCodeSnippet}</span>
        <span className="text-[10px] text-slate-400 font-sans">Faulty mental model</span>
      </div>

      {/* What Happened */}
      <div className="space-y-1">
        <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider block font-mono">
          What Happened
        </span>
        <p className="text-slate-200 leading-relaxed text-xs">
          {diagnosis.whatHappened}
        </p>
      </div>

      {/* Why (The Underlying Misconception) */}
      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/50 space-y-1">
        <span className="text-amber-300 font-semibold text-[11px] uppercase tracking-wider block font-mono flex items-center gap-1">
          <Brain className="w-3.5 h-3.5 text-amber-400" />
          The Underlying Misconception
        </span>
        <p className="text-slate-300 leading-relaxed text-xs">
          {diagnosis.whyHappened}
        </p>
      </div>

      {/* Mental Model Fix */}
      <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/50 space-y-1">
        <span className="text-indigo-300 font-semibold text-[11px] uppercase tracking-wider block font-mono">
          How to think about it:
        </span>
        <p className="text-slate-300 leading-relaxed text-xs">
          {diagnosis.mentalModelFix}
        </p>
      </div>

      {/* Expandable "Why We Think This" (Section 16) */}
      <div className="pt-1">
        <button
          onClick={() => setIsWhyOpen(!isWhyOpen)}
          className="w-full flex items-center justify-between py-1.5 text-slate-400 hover:text-slate-200 font-mono text-[11px] border-t border-slate-800 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Why we think this (Confidence Breakdown)
          </span>
          {isWhyOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isWhyOpen && (
          <div className="mt-2 space-y-2 p-2.5 rounded-lg bg-black/40 border border-slate-800/80 animate-in fade-in duration-200">
            {diagnosis.topAlternatives.map((alt) => (
              <div key={alt.misconceptionId} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-200 font-mono">
                    {alt.misconceptionName}
                  </span>
                  <span className="font-mono font-bold text-indigo-300">
                    {alt.confidence}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${alt.confidence}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">{alt.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons (Section 40) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
        <button
          onClick={onOpenProbe}
          className={`px-3 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 border transition-all ${
            hasAnsweredProbe
              ? "bg-slate-800/80 text-emerald-300 border-emerald-800/60"
              : "bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-200 border-indigo-700/80 animate-pulse"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>{hasAnsweredProbe ? "✓ Probe Answered (94%)" : "Answer Probe Question"}</span>
        </button>

        <button
          onClick={onOpenTrace}
          className="px-3 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>See Execution Trace</span>
        </button>

        <button
          onClick={onScrollToChat}
          className="px-3 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
          <span>Ask Re:Learn</span>
        </button>

        <button
          onClick={onStartReassessment}
          className="px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50 transition-colors"
        >
          <span>Practice Concept</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
