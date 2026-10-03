import React from "react";
import { LearnerProfile } from "../types";
import {
  Sparkles,
  Target,
  Brain,
  RotateCcw,
} from "lucide-react";
import { ProgressBar } from "../components/common/ProgressBar";

interface ProfilePageProps {
  learner: LearnerProfile;
  onProfileUpdated: (updated: LearnerProfile) => void;
  onResetData: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  learner,
  onResetData,
}) => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-slate-200">
      {/* Profile Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121929] via-[#0f1422] to-[#0c0f18] border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-indigo-600/30">
            {learner.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {learner.name}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              {learner.email} • {learner.title}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Target: {learner.goal}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onResetData}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Level System Philosophy Banner (Section 31) */}
      <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-extrabold font-mono text-base text-white">
              LEVEL {learner.level}: {learner.levelTitle.toUpperCase()}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-300">
            {learner.masteryPercentage}% Python Mastery
          </span>
        </div>

        <ProgressBar value={learner.masteryProgressToNextLevel} color="indigo" height="md" />

        <div className="p-3 rounded-xl bg-black/60 border border-indigo-900/60 text-xs text-indigo-200 leading-relaxed font-mono">
          <span className="text-indigo-400 font-bold mr-1">Cognitive Level Principle:</span>
          Your level increases when your underlying understanding improves, not simply when you brute-force more questions.
        </div>
      </div>

      {/* Stats Grid (Section 30) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-mono">Problems Solved</div>
          <div className="text-2xl font-bold font-mono text-white">
            {learner.problemsSolved}
          </div>
          <div className="text-[11px] text-slate-500">Verified algorithmic challenges</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-mono">Misconceptions Resolved</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {learner.misconceptionsResolved}
          </div>
          <div className="text-[11px] text-slate-500">Graduated through transfer tests</div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-mono">Active / Recurring</div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {learner.activeMisconceptionsCount} / {learner.recurringMisconceptionsCount}
          </div>
          <div className="text-[11px] text-slate-500">Under continuous adaptive review</div>
        </div>
      </div>

      {/* Learning Preferences & Style Profile (Section 30) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            Cognitive Learner Model
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Most Effective Explanation:</span>
              <span className="font-bold text-slate-100 font-mono">
                {learner.effectiveTeachingStyle}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Average Hints Needed:</span>
              <span className="font-bold text-slate-100 font-mono">
                {learner.averageHintsNeeded} per struggle
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            Strength & Practice Distribution
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Strongest Concepts:</span>
              <div className="flex flex-wrap gap-1.5">
                {learner.strongestConcepts.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[11px]"
                  >
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Needs Adaptive Practice:</span>
              <div className="flex flex-wrap gap-1.5">
                {learner.needsPractice.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-mono text-[11px]"
                  >
                    ⚠ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
