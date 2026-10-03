import React from "react";
import { LearnerProfile } from "../types";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface MainDashboardProps {
  learner: LearnerProfile;
  onStartLesson: (conceptId?: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  learner,
  onStartLesson,
}) => {
  // Comprehensive Python Fundamentals catalog
  const fundamentals = [
    {
      id: "variables",
      title: "Variables & Data Types",
      description: "Memory assignment, naming conventions, integers, floats, strings, and type casting.",
      mastery: 91,
      status: "Mastered",
      statusColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/80",
    },
    {
      id: "conditions",
      title: "Conditions & Branching",
      description: "Boolean logic, if-elif-else statements, truthiness, and comparison operators.",
      mastery: 78,
      status: "Proficient",
      statusColor: "text-teal-400 bg-teal-950/60 border-teal-800/80",
    },
    {
      id: "lists",
      title: "Lists & Sequences",
      description: "0-based indexing, negative indexes, slicing, iteration, and in-place list methods.",
      mastery: 73,
      status: "Proficient",
      statusColor: "text-teal-400 bg-teal-950/60 border-teal-800/80",
    },
    {
      id: "loops",
      title: "Loops & Iterations",
      description: "for loops, while loops, range boundaries, break/continue, and nested iteration.",
      mastery: 64,
      status: "Developing",
      statusColor: "text-amber-400 bg-amber-950/60 border-amber-800/80",
    },
    {
      id: "problem-solving",
      title: "Problem Solving Patterns",
      description: "Accumulator variables, boundary checks, flag patterns, and algorithmic traces.",
      mastery: 58,
      status: "Developing",
      statusColor: "text-amber-400 bg-amber-950/60 border-amber-800/80",
    },
    {
      id: "functions",
      title: "Functions & Return Values",
      description: "Parameters, return statements vs print display, variable scope, and caller references.",
      mastery: 52,
      status: "Current Lesson",
      statusColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800/80 font-bold",
      isCurrent: true,
    },
    {
      id: "dictionaries",
      title: "Dictionaries & Mappings",
      description: "Key-value pairs, .get() safe access, dictionary updates, and key lookups.",
      mastery: 41,
      status: "Needs Practice",
      statusColor: "text-rose-400 bg-rose-950/60 border-rose-800/80",
    },
    {
      id: "error-handling",
      title: "Error Handling & Debugging",
      description: "Understanding stack traces, IndexError, KeyError, TypeError, and try-except blocks.",
      mastery: 35,
      status: "Up Next",
      statusColor: "text-slate-400 bg-slate-900 border-slate-800",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-foreground">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Python Fundamentals Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Track concept mastery and continue your personalized programming path.
        </p>
      </div>

      {/* Level & Progress Hero Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-chart-1 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Progression</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-3">
              <span>Level {learner.level}: {learner.levelTitle}</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                {learner.masteryPercentage}% Mastery
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-lg">
              Your level increases when underlying concept understanding improves, not simply by solving more questions.
            </p>
          </div>

          <button
            onClick={() => onStartLesson("functions")}
            className="px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
          >
            <span>Continue Current Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar with Milestones */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Progress to Level {learner.level + 1}</span>
            <span className="text-foreground font-semibold">{learner.masteryProgressToNextLevel}%</span>
          </div>
          <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden border border-border">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${learner.masteryProgressToNextLevel}%` }}
            />
          </div>
        </div>
      </div>

      {/* Python Fundamentals Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-chart-2" />
            Core Python Fundamentals
          </h2>
          <span className="text-xs font-mono text-muted-foreground">
            8 Total Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fundamentals.map((fund) => (
            <div
              key={fund.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 ${
                fund.isCurrent
                  ? "bg-card border-chart-2 shadow-sm"
                  : "bg-card/70 border-border hover:border-border/80 hover:bg-card"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${fund.statusColor}`}>
                    {fund.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground">
                    {fund.mastery}%
                  </span>
                </div>

                <h3 className="font-bold text-sm text-foreground">
                  {fund.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {fund.description}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-border">
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      fund.mastery >= 75
                        ? "bg-emerald-500"
                        : fund.mastery >= 50
                        ? "bg-chart-2"
                        : "bg-chart-1"
                    }`}
                    style={{ width: `${fund.mastery}%` }}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => onStartLesson(fund.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      fund.isCurrent
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-muted hover:bg-accent text-foreground"
                    }`}
                  >
                    <span>{fund.isCurrent ? "Start Lesson" : "Practice Concept"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
