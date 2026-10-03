import React from "react";
import {
  Menu,
  Play,
  RotateCcw,
  GitCompare,
} from "lucide-react";
import { LearnerProfile } from "../../types";

interface TopBarProps {
  currentPath: string;
  learner: LearnerProfile;
  onToggleMobile: () => void;
  onOpenDemoTour: () => void;
  onOpenLearnerComparison: () => void;
  onResetData: () => void;
  onNavigate: (path: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPath,
  learner,
  onToggleMobile,
  onOpenDemoTour,
  onOpenLearnerComparison,
  onResetData,
  onNavigate,
}) => {
  const getBreadcrumb = (path: string) => {
    if (path.startsWith("/learn")) return "Learning Environment → Functions & Returns";
    if (path === "/dashboard") return "Learner Dashboard";
    if (path === "/progress") return "Adaptive Skill Analytics & Mastery";
    if (path === "/misconceptions") return "Active & Resolved Misconceptions";
    if (path === "/history") return "Learning Timeline & Submissions";
    if (path === "/profile") return "Learner Model & Preferences";
    if (path.startsWith("/reassessment")) return "Targeted Transfer Reassessment";
    return "Re:Learn";
  };

  return (
    <header className="h-14 border-b border-slate-800/80 bg-[#0d131f]/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="md:hidden p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-slate-400">
            {getBreadcrumb(currentPath)}
          </span>
        </div>
      </div>

      {/* Action Tools & Demo Controls */}
      <div className="flex items-center gap-2">
        {/* Learner A vs B Compare Modal Trigger (Section 39) */}
        <button
          onClick={onOpenLearnerComparison}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-300 hover:text-slate-100 hover:bg-slate-700/80 border border-slate-700 transition-colors"
          title="Compare look-alike mistakes: Misconception vs Careless Slip"
        >
          <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Learner A vs B</span>
        </button>

        {/* 3-Minute Demo Tour Guided Trigger (Section 46) */}
        <button
          onClick={onOpenDemoTour}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>3-Min Demo Tour</span>
        </button>

        {/* Quick Reset Button */}
        <button
          onClick={onResetData}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Reset Demo Data to Initial State"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Learner Avatar Pill */}
        <button
          onClick={() => onNavigate("/profile")}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <span className="text-xs font-medium text-slate-300 hidden sm:inline">
            {learner.name.split(" ")[0]}
          </span>
          <div className="w-6 h-6 rounded-full bg-indigo-600/40 border border-indigo-400/50 flex items-center justify-center text-xs font-bold text-indigo-300">
            {learner.name.charAt(0)}
          </div>
        </button>
      </div>
    </header>
  );
};
