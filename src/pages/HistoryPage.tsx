import React, { useState } from "react";
import { LearningHistoryEvent, ProblemHistoryRecord } from "../types";
import {
  CheckCircle2,
  AlertTriangle,
  FileCode,
} from "lucide-react";
import { Modal } from "../components/common/Modal";

interface HistoryPageProps {
  events: LearningHistoryEvent[];
  problems: ProblemHistoryRecord[];
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ events, problems }) => {
  const [activeTab, setActiveTab] = useState<"timeline" | "problems">("timeline");
  const [inspectedProblem, setInspectedProblem] = useState<ProblemHistoryRecord | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Learning & Submission History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit trail of code attempts, detected misconceptions, and cognitive breakthroughs.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "timeline"
                ? "bg-indigo-600 text-white font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Learning Timeline
          </button>
          <button
            onClick={() => setActiveTab("problems")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === "problems"
                ? "bg-indigo-600 text-white font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Problem Submissions ({problems.length})
          </button>
        </div>
      </div>

      {/* TAB 1: TIMELINE (Section 28) */}
      {activeTab === "timeline" && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="relative border-l border-slate-800 ml-4 space-y-6">
            {events.map((evt, idx) => {
              const isSuccess =
                evt.type.includes("resolved") ||
                evt.type.includes("solved") ||
                evt.type.includes("passed");

              return (
                <div key={evt.id || idx} className="relative pl-6">
                  {/* Dot */}
                  <div
                    className={`absolute -left-2.5 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSuccess
                        ? "bg-emerald-950 border-emerald-500 text-emerald-400"
                        : "bg-amber-950 border-amber-500 text-amber-400"
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-850 space-y-1.5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-200">{evt.title}</span>
                      <span className="text-slate-500 text-[11px]">{evt.date}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {evt.detail}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-indigo-400">
                      <span>Concept: {evt.relatedConcept}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PROBLEM TABLE (Section 29) */}
      {activeTab === "problems" && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="p-4">Problem</th>
                  <th className="p-4">Concept</th>
                  <th className="p-4">Result</th>
                  <th className="p-4">Attempts</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {problems.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-850/50 transition-colors group cursor-pointer"
                    onClick={() => setInspectedProblem(p)}
                  >
                    <td className="p-4 font-semibold text-slate-100 flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{p.problemTitle}</span>
                    </td>
                    <td className="p-4 text-slate-300">{p.concept}</td>
                    <td className="p-4">
                      {p.result === "correct" ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-amber-400 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Diagnosed
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-400">{p.attempts} attempt(s)</td>
                    <td className="p-4 text-slate-500 text-[11px]">{p.date}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedProblem(p);
                        }}
                        className="text-indigo-400 hover:text-indigo-300 text-xs font-sans font-semibold"
                      >
                        Inspect Code →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inspect Code Modal (Section 29) */}
      {inspectedProblem && (
        <Modal
          isOpen={true}
          onClose={() => setInspectedProblem(null)}
          title={`Submission: ${inspectedProblem.problemTitle}`}
          subtitle={`Concept: ${inspectedProblem.concept} • Attempts: ${inspectedProblem.attempts}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-mono text-slate-400">
                Status:{" "}
                <span
                  className={
                    inspectedProblem.result === "correct"
                      ? "text-emerald-400 font-bold"
                      : "text-amber-400 font-bold"
                  }
                >
                  {inspectedProblem.result.toUpperCase()}
                </span>
              </span>
              {inspectedProblem.diagnosedMisconception && (
                <span className="text-amber-400 font-mono text-[11px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  ⚠ {inspectedProblem.diagnosedMisconception}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[11px] text-slate-400 block uppercase">
                Submitted Python Code:
              </span>
              <pre className="p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap">
                {inspectedProblem.submittedCode}
              </pre>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Every submission is retained with its AST diagnosis snapshot and transfer evaluation
              so learners and mentors can trace cognitive progression over time.
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectedProblem(null)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
