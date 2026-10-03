import React, { useState } from "react";
import {
  LearnerProfile,
  Misconception,
  LearningHistoryEvent,
  LearnerSkill,
} from "../types";
import {
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  History,
} from "lucide-react";
import { SkillBar } from "../components/common/SkillBar";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";

interface DashboardPageProps {
  learner: LearnerProfile;
  misconceptions: Misconception[];
  historyEvents: LearningHistoryEvent[];
  onContinueLearning: () => void;
  onReviewMisconception: (misconceptionId: string) => void;
  onTriggerDelayedRecheck: () => void;
  onNavigateToHistory: () => void;
  delayedCheckDue?: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  learner,
  misconceptions,
  historyEvents,
  onContinueLearning,
  onReviewMisconception,
  onTriggerDelayedRecheck,
  onNavigateToHistory,
  delayedCheckDue = false,
}) => {
  const [selectedConcept, setSelectedConcept] = useState<LearnerSkill | null>(null);

  const activeMisconceptions = misconceptions.filter(
    (m) => m.status === "active" || m.status === "recurring"
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-slate-200">
      {/* Delayed Re-Check Notification Banner (Section 24) */}
      {delayedCheckDue && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/60 shadow-lg shadow-indigo-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-400 flex items-center justify-center text-indigo-300 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <span>Delayed Re-Check Due: Return vs Print</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-600 text-white font-mono uppercase">
                  Spaced Retention
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                It's been a while since your initial transfer practice. Let's see if this mental model still holds!
              </p>
            </div>
          </div>

          <button
            onClick={onTriggerDelayedRecheck}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors self-start sm:self-auto shadow-md shadow-indigo-950/40 shrink-0"
          >
            Start Quick Re-Check →
          </button>
        </div>
      )}

      {/* Greeting Header (Section 7) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Good afternoon, {learner.name.split(" ")[0]}.
        </h1>
        <p className="text-sm text-slate-400">
          Let's strengthen your Python skills. Current target:{" "}
          <span className="text-indigo-400 font-medium">{learner.goal}</span>.
        </p>
      </div>

      {/* Hero Continue Learning Card (Section 7) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121929] via-[#101624] to-[#0e121d] border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Continue Learning
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Recommended Difficulty: <span className="text-amber-400 font-bold">Medium</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="text-xs text-slate-400 font-mono">
              Current Concept: <span className="text-slate-200">Functions → Return Values</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Next Problem: Calculate Total (Sum of Two Numbers)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Reinforce the boundary between terminal side-effects and returned data variables.
            </p>

            <div className="space-y-1 pt-1 max-w-md">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Concept Unit Progress</span>
                <span className="text-indigo-300 font-semibold">78%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: "78%" }} />
              </div>
            </div>
          </div>

          <div className="flex md:justify-end">
            <button
              onClick={onContinueLearning}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Skill Map vs Active Misconceptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Skill Map (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              YOUR PYTHON SKILL MAP
            </h3>
            <span className="text-[11px] text-slate-500">
              Click concept for cognitive breakdown
            </span>
          </div>

          <div className="space-y-2">
            {learner.skills.map((skill) => (
              <SkillBar
                key={skill.concept}
                skill={skill}
                onClick={() => setSelectedConcept(skill)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Active Misconceptions & Recent Activity */}
        <div className="space-y-6">
          {/* Active Misconceptions Card (Section 7) */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Active Misconceptions
              </h3>
              <span className="text-xs font-mono font-semibold text-amber-400">
                {activeMisconceptions.length} need attention
              </span>
            </div>

            <div className="space-y-3">
              {activeMisconceptions.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-amber-900/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200 text-xs">{m.name}</span>
                    <Badge type={m.status} label={m.status.toUpperCase()} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    {m.faultyBelief}
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                    <span>Seen {m.occurrenceCount} times</span>
                    <button
                      onClick={() => onReviewMisconception(m.id)}
                      className="text-indigo-400 hover:text-indigo-300 font-bold"
                    >
                      Review →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline (Section 7) */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-slate-400" />
                Recent Activity
              </h3>
              <button
                onClick={onNavigateToHistory}
                className="text-[11px] text-indigo-400 hover:text-indigo-300"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {historyEvents.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-850 flex items-start gap-2.5"
                >
                  {event.type.includes("resolved") || event.type.includes("solved") || event.type.includes("passed") ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-200 truncate">
                      {event.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {event.relatedConcept} • {event.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Concept Breakdown Modal */}
      {selectedConcept && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedConcept(null)}
          title={`Concept Mastery: ${selectedConcept.concept}`}
          subtitle="Detailed cognitive breakdown of evaluated principles."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-xs block">Demonstrated Confidence</span>
                <span className="text-2xl font-bold font-mono text-indigo-400">
                  {selectedConcept.masteryPercentage}%
                </span>
              </div>
              <Badge label={selectedConcept.status.toUpperCase()} variant="info" />
            </div>

            <p className="leading-relaxed">
              Mastery in <strong>{selectedConcept.concept}</strong> is measured using verified problem solving,
              transfer tests, and absence of active misconceptions.
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedConcept(null)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
