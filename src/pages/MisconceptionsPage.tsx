import React, { useState } from "react";
import { Misconception, MisconceptionStatus } from "../types";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import {
  BrainCircuit,
  Search,
  GitCompare,
} from "lucide-react";

interface MisconceptionsPageProps {
  misconceptions: Misconception[];
  onReviewMisconception: (misconceptionId: string) => void;
}

export const MisconceptionsPage: React.FC<MisconceptionsPageProps> = ({
  misconceptions,
  onReviewMisconception,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | MisconceptionStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectedMisconception, setInspectedMisconception] = useState<Misconception | null>(null);

  const filtered = misconceptions.filter((m) => {
    const matchesTab = activeTab === "all" || m.status === activeTab;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.faultyBelief.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.relatedConcept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: misconceptions.length,
    active: misconceptions.filter((m) => m.status === "active").length,
    resolved: misconceptions.filter((m) => m.status === "resolved").length,
    recurring: misconceptions.filter((m) => m.status === "recurring").length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-200">
      {/* Header (Section 26) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Your Misconceptions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Re:Learn tracks the ideas that have caused you trouble — not just the questions you got wrong.
        </p>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          {[
            { id: "all", label: "All", count: counts.all },
            { id: "active", label: "Active", count: counts.active },
            { id: "recurring", label: "Recurring", count: counts.recurring },
            { id: "resolved", label: "Resolved", count: counts.resolved },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                  isSelected
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200 bg-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search misconceptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Misconception Cards Grid (Section 25 & 26) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge type={m.status} label={m.status.toUpperCase()} size="sm" />
                  <span className="text-[10px] font-mono text-slate-500">
                    {m.relatedConcept}
                  </span>
                </div>

                <span className="text-[11px] font-mono font-bold text-indigo-400">
                  {m.confidence}%
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                {m.name}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {m.faultyBelief}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-850">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Seen: {m.occurrenceCount}x</span>
                {m.resolvedCount > 0 && (
                  <span className="text-emerald-400">Resolved: {m.resolvedCount}x</span>
                )}
                {m.returnedCount > 0 && (
                  <span className="text-rose-400">Returned: {m.returnedCount}x</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectedMisconception(m)}
                  className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-xs text-center border border-slate-700 transition-colors"
                >
                  Inspect Details
                </button>
                <button
                  onClick={() => onReviewMisconception(m.id)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-500 space-y-2">
          <BrainCircuit className="w-8 h-8 text-slate-600 mx-auto" />
          <div className="text-sm font-semibold text-slate-300">
            No misconceptions found matching this filter
          </div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or tab selection.
          </p>
        </div>
      )}

      {/* Detailed Misconception Inspection Modal */}
      {inspectedMisconception && (
        <Modal
          isOpen={true}
          onClose={() => setInspectedMisconception(null)}
          title={inspectedMisconception.name}
          subtitle={`Concept: ${inspectedMisconception.relatedConcept}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Badge
                  type={inspectedMisconception.status}
                  label={inspectedMisconception.status.toUpperCase()}
                />
                <Badge
                  type={inspectedMisconception.category}
                  label={inspectedMisconception.category.toUpperCase()}
                />
              </div>
              <div className="text-right font-mono text-xs">
                <span className="text-slate-400">Mastery Confidence: </span>
                <span className="text-indigo-400 font-bold">
                  {inspectedMisconception.confidence}%
                </span>
              </div>
            </div>

            {/* Faulty Belief */}
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-1">
              <span className="text-amber-300 font-bold font-mono text-[11px] block uppercase tracking-wider">
                Faulty Mental Belief
              </span>
              <p className="text-slate-200 leading-relaxed">
                {inspectedMisconception.faultyBelief}
              </p>
            </div>

            {/* Scientific Explanation */}
            <div className="space-y-1">
              <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider block font-semibold">
                Underlying Python Semantics
              </span>
              <p className="text-slate-300 leading-relaxed text-xs">
                {inspectedMisconception.explanation}
              </p>
            </div>

            {/* Contrast Example */}
            {inspectedMisconception.contrastExample && (
              <div className="p-4 rounded-xl bg-black/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-indigo-300 font-mono text-xs font-bold flex items-center gap-1.5">
                    <GitCompare className="w-3.5 h-3.5 text-indigo-400" />
                    Contrast Representation
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Side-by-side</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/40 text-rose-300">
                    <span className="font-bold text-[10px] text-rose-400 block mb-1">
                      Flawed Code:
                    </span>
                    <pre className="whitespace-pre-wrap">
                      {inspectedMisconception.contrastExample.flawed}
                    </pre>
                  </div>
                  <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-300">
                    <span className="font-bold text-[10px] text-emerald-400 block mb-1">
                      Sound Code:
                    </span>
                    <pre className="whitespace-pre-wrap">
                      {inspectedMisconception.contrastExample.sound}
                    </pre>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans">
                  {inspectedMisconception.contrastExample.explanation}
                </p>
              </div>
            )}

            {/* Diagnostic Probe Preview */}
            {inspectedMisconception.probeQuestion && (
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider block font-semibold">
                  Diagnostic Probe Question
                </span>
                <p className="text-slate-300 font-mono text-xs">
                  {inspectedMisconception.probeQuestion.question}
                </p>
                <code className="text-indigo-300 font-mono block text-xs">
                  {inspectedMisconception.probeQuestion.codeSnippet}
                </code>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-slate-500 font-mono text-[11px]">
                Last encountered: {inspectedMisconception.lastEncountered}
              </span>
              <button
                onClick={() => {
                  const id = inspectedMisconception.id;
                  setInspectedMisconception(null);
                  onReviewMisconception(id);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                Launch Targeted Reassessment →
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
