import React from "react";
import { LearnerSkill } from "../../types";

interface SkillBarProps {
  skill: LearnerSkill;
  onClick?: () => void;
}

export const SkillBar: React.FC<SkillBarProps> = ({ skill, onClick }) => {
  // Determine color based on percentage
  let barColor = "bg-rose-500";
  let statusText = "Needs Attention";
  let statusBadge = "text-rose-400 bg-rose-950/40 border-rose-800/50";

  if (skill.masteryPercentage >= 85) {
    barColor = "bg-emerald-400";
    statusText = "Mastered";
    statusBadge = "text-emerald-400 bg-emerald-950/40 border-emerald-800/50";
  } else if (skill.masteryPercentage >= 70) {
    barColor = "bg-teal-400";
    statusText = "Proficient";
    statusBadge = "text-teal-400 bg-teal-950/40 border-teal-800/50";
  } else if (skill.masteryPercentage >= 55) {
    barColor = "bg-amber-400";
    statusText = "Developing";
    statusBadge = "text-amber-400 bg-amber-950/40 border-amber-800/50";
  }

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 ${
        onClick ? "cursor-pointer hover:bg-slate-800/50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-slate-200">{skill.concept}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${statusBadge}`}>
            {statusText}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {skill.trend && (
            <span
              className={`text-xs font-mono ${
                skill.trend.startsWith("+")
                  ? "text-emerald-400"
                  : skill.trend.startsWith("-")
                  ? "text-rose-400"
                  : "text-slate-400"
              }`}
            >
              {skill.trend}
            </span>
          )}
          <span className="font-mono text-xs font-bold text-slate-100">
            {skill.masteryPercentage}%
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/60">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${skill.masteryPercentage}%` }}
        />
      </div>
    </div>
  );
};
