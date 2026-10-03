import React from "react";
import { Clock, ShieldCheck, Tag } from "lucide-react";
import { Problem } from "../../types";
import { Badge } from "../common/Badge";

interface ProblemHeaderProps {
  problem: Problem;
  problemIndex?: number;
  totalProblems?: number;
}

export const ProblemHeader: React.FC<ProblemHeaderProps> = ({
  problem,
  problemIndex = 12,
  totalProblems = 40,
}) => {
  return (
    <div className="p-4 border-b border-slate-800 bg-[#0d131f] flex flex-wrap items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
          Problem {problemIndex} of {totalProblems}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-medium">
          <Tag className="w-3.5 h-3.5" />
          <span>{problem.concept}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Est. {problem.estimatedTime}</span>
        </div>

        <Badge
          label={problem.difficulty.toUpperCase()}
          variant={
            problem.difficulty === "easy"
              ? "success"
              : problem.difficulty === "medium"
              ? "warning"
              : "error"
          }
          size="sm"
        />

        {problem.verified && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400/90 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Verified Spec
          </span>
        )}
      </div>
    </div>
  );
};
