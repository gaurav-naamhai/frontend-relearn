import React from "react";
import { LearnerProfile } from "../types";
import {
  Award,
  Brain,
  Sparkles,
} from "lucide-react";
import { SkillBar } from "../components/common/SkillBar";

interface ProgressPageProps {
  learner: LearnerProfile;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ learner }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Cognitive Learning Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tracking mental models, concept retention, and diagnostic velocity.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-700/60 font-mono text-xs text-indigo-300 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Cognitively Calibrated</span>
        </div>
      </div>

      {/* Top 3 Stat Cards (Section 27) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Python Mastery */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Python Mastery</span>
            <span className="text-emerald-400 font-bold">+8% this week</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
            {learner.masteryPercentage}%
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Aggregated across 7 core Python domains with active misconception penalties.
          </p>
        </div>

        {/* Resolved Misconceptions */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Misconceptions Cleared</span>
            <span className="text-indigo-400 font-bold">{learner.activeMisconceptionsCount} active</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-mono">
            {learner.misconceptionsResolved}
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Permanently verified through transfer challenges and delayed spaced re-checks.
          </p>
        </div>

        {/* Guidance Efficiency */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Hint Ladder Efficiency</span>
            <span className="text-cyan-400 font-bold">Optimal</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono">
            {learner.averageHintsNeeded}
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Average hints requested before arriving at an independent conceptual breakthrough.
          </p>
        </div>
      </div>

      {/* Main Breakdown: Concept Mastery Skills */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Concept Mastery Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Weighted by verified problem outputs and transfer assessments.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Target: 85%+ for placement readiness
          </span>
        </div>

        <div className="space-y-2.5">
          {learner.skills.map((skill) => (
            <SkillBar key={skill.concept} skill={skill} />
          ))}
        </div>
      </div>

      {/* Cognitive Learning Habits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
          <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            Adaptive Cognitive Insights
          </h4>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-slate-200 block mb-1">
                Preferred Representation
              </span>
              <p className="text-slate-400">
                You resolve faulty models 2.4x faster when presented with <strong>Contrast Examples</strong> comparing flawed vs sound code.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="font-semibold text-slate-200 block mb-1">
                Zero-Slip Trend
              </span>
              <p className="text-slate-400">
                Your syntax accuracy in conditions and loops has stabilized at 96%, indicating high typing fidelity.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
          <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            Placement Readiness Profile
          </h4>
          <div className="space-y-2 font-mono">
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Basic Data Structures</span>
              <span className="text-emerald-400 font-bold">Ready</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Control Flow & Iteration</span>
              <span className="text-teal-400 font-bold">Ready</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Functional Decomposition</span>
              <span className="text-amber-400 font-bold">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Recursive Structures</span>
              <span className="text-slate-500">Upcoming (Level 9)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
