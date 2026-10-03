import React from "react";
import { LearnerProfile } from "../types";
import { Target, CheckCircle2 } from "lucide-react";

interface ProfileSectionProps {
  learner: LearnerProfile;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ learner }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-slate-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Learner Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Your cognitive learning identity and current mastery standings.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl font-mono shadow-md">
            {learner.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {learner.name}
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              {learner.email} • {learner.title}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Goal: {learner.goal}
              </span>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right font-mono border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
          <div className="text-xs text-slate-400">Progression</div>
          <div className="text-xl font-bold text-indigo-400">
            Level {learner.level}
          </div>
          <div className="text-xs text-slate-400">
            {learner.masteryPercentage}% Python Mastery
          </div>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400">Problems Solved</span>
          <div className="text-2xl font-bold text-white font-sans">{learner.problemsSolved}</div>
          <span className="text-[11px] text-slate-500 font-sans">Verified algorithmic tasks</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400">Misconceptions Cleared</span>
          <div className="text-2xl font-bold text-emerald-400 font-sans">{learner.misconceptionsResolved}</div>
          <span className="text-[11px] text-slate-500 font-sans">Resolved through transfer</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400">Active Weaknesses</span>
          <div className="text-2xl font-bold text-amber-400 font-sans">{learner.activeMisconceptionsCount}</div>
          <span className="text-[11px] text-slate-500 font-sans">Under ongoing practice</span>
        </div>
      </div>

      {/* Concept Distribution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Strongest Fundamentals
          </h3>
          <div className="flex flex-wrap gap-2">
            {learner.strongestConcepts.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 font-mono text-[11px]"
              >
                ✓ {c}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            Concepts In Progress
          </h3>
          <div className="flex flex-wrap gap-2">
            {learner.needsPractice.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800/80 font-mono text-[11px]"
              >
                ⚠ {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
