import React from "react";
import { Problem } from "../../types";

interface ProblemStatementProps {
  problem: Problem;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ problem }) => {
  return (
    <div className="p-5 overflow-y-auto space-y-5 text-slate-300 text-sm h-full custom-scrollbar">
      <div>
        <h2 className="text-xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
          {problem.title}
        </h2>
        <p className="mt-2 text-slate-300 leading-relaxed text-sm">
          {problem.description}
        </p>
      </div>

      {/* Input / Output Spec */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-xs font-mono font-semibold text-indigo-400 block mb-1">
            Input:
          </span>
          <span className="text-xs text-slate-300">{problem.inputDescription}</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <span className="text-xs font-mono font-semibold text-emerald-400 block mb-1">
            Output:
          </span>
          <span className="text-xs text-slate-300">{problem.outputDescription}</span>
        </div>
      </div>

      {/* Constraints */}
      {problem.constraints && problem.constraints.length > 0 && (
        <div className="pt-1">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Constraints & Notes
          </span>
          <ul className="space-y-1.5 text-xs text-slate-400">
            {problem.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-slate-600 select-none">•</span>
                <code className="text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 font-mono">
                  {c}
                </code>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples */}
      <div className="pt-2 space-y-3">
        <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
          Examples
        </span>

        {problem.examples.map((example, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/90 font-mono text-xs space-y-2"
          >
            <div className="text-slate-500 font-semibold text-[11px]">Example {idx + 1}</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div>
                <span className="text-slate-500 mr-2">Input:</span>
                <span className="text-slate-200">{example.input}</span>
              </div>
              <div>
                <span className="text-slate-500 mr-2">Output:</span>
                <span className="text-emerald-400 font-bold">{example.output}</span>
              </div>
            </div>
            {example.explanation && (
              <div className="text-[11px] text-slate-400 font-sans border-t border-slate-900 pt-1.5">
                <span className="text-slate-500 font-mono mr-1">Why:</span>
                {example.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
