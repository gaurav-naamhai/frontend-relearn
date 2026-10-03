import React, { useState } from "react";
import { TeachingStyle } from "../types";
import { learnerService } from "../services/learnerService";
import { TeachingStyleSelector } from "../components/reassessment/TeachingStyleSelector";
import { PredictAndExplain } from "../components/reassessment/PredictAndExplain";
import { DelayedRecheckModal } from "../components/reassessment/DelayedRecheckModal";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react";

interface ReassessmentPageProps {
  misconceptionId?: string;
  onComplete: () => void;
  initialView?: "transfer" | "style" | "predict";
}

export const ReassessmentPage: React.FC<ReassessmentPageProps> = ({
  misconceptionId = "return-vs-print",
  onComplete,
  initialView = "transfer",
}) => {

  const [currentStepIndex, setCurrentStepIndex] = useState(
    initialView === "style" ? 1 : initialView === "predict" ? 2 : 0
  );
  const [selectedStyle, setSelectedStyle] = useState<TeachingStyle>("contrast-examples");
  const [transfer1Code, setTransfer1Code] = useState(
    "def calculate_tax(subtotal, rate):\n    # Returning price + tax\n    return subtotal + (subtotal * rate)"
  );
  const [transfer1Result, setTransfer1Result] = useState<"idle" | "passed" | "failed">("idle");
  const [isDelayedModalOpen, setIsDelayedModalOpen] = useState(false);
  const [isProvisionalMastery, setIsProvisionalMastery] = useState(false);

  const handleRunTransfer1 = () => {
    // Check if code has return
    if (transfer1Code.includes("return")) {
      setTransfer1Result("passed");
    } else {
      setTransfer1Result("failed");
    }
  };

  const handleTeachingStyleSelected = (style: TeachingStyle) => {
    setSelectedStyle(style);
    learnerService.setPreferredTeachingStyle(style);
  };

  const handlePredictPassed = () => {
    setIsProvisionalMastery(true);
  };

  const handleDelayedSuccess = () => {
    learnerService.resolveMisconception(misconceptionId);
    onComplete();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-slate-200">
      {/* Header (Section 20) */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
            Reassessment Step {currentStepIndex + 1} of 3
          </span>
          <span className="text-xs text-slate-400 font-mono">Target: Return vs Print</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Let's check whether the idea stuck.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Solving the original problem correctly isn't enough. Let's test the same idea in a new situation.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-mono">
        <button
          onClick={() => setCurrentStepIndex(0)}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            currentStepIndex === 0
              ? "bg-indigo-600 text-white font-bold"
              : "text-slate-400 hover:text-slate-200 bg-slate-900"
          }`}
        >
          1. Transfer: Tax Calculation
        </button>
        <button
          onClick={() => setCurrentStepIndex(1)}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            currentStepIndex === 1
              ? "bg-indigo-600 text-white font-bold"
              : "text-slate-400 hover:text-slate-200 bg-slate-900"
          }`}
        >
          2. Teaching Style Switch
        </button>
        <button
          onClick={() => setCurrentStepIndex(2)}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            currentStepIndex === 2
              ? "bg-indigo-600 text-white font-bold"
              : "text-slate-400 hover:text-slate-200 bg-slate-900"
          }`}
        >
          3. Predict & Explain
        </button>
      </div>

      {/* STEP 1: TRANSFER PROBLEM 1 */}
      {currentStepIndex === 0 && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-100">
                Transfer Problem 1: Calculate Sales Tax
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Surface context: Finance
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Write a function <code>calculate_tax(subtotal, rate)</code> that returns the total
              final price after adding tax (<code>subtotal + subtotal * rate</code>). The returned value must be usable in further calculations.
            </p>

            {/* Code Box */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-slate-400">Your Transfer Solution:</div>
              <textarea
                rows={4}
                value={transfer1Code}
                onChange={(e) => setTransfer1Code(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-slate-800 font-mono text-xs text-indigo-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunTransfer1}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Transfer Tests</span>
                </button>
              </div>

              {transfer1Result === "passed" && (
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs animate-in fade-in duration-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>✓ Transfer problem passed</span>
                </div>
              )}
            </div>

            {transfer1Result === "passed" && (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-xs text-emerald-200 space-y-2 animate-in fade-in duration-300">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Transfer Success!</span>
                </div>
                <p>
                  You applied the return value concept in a brand new problem context.
                  Now let's test a second transfer challenge to see what happens when difficulty shifts.
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setCurrentStepIndex(1)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1"
                  >
                    <span>Proceed to Scene 8 (Teaching Switch)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: TEACHING STYLE SWITCH (Section 22 & Scene 8) */}
      {currentStepIndex === 1 && (
        <div className="space-y-4">
          {/* Simulated Transfer Failure Alert */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Transfer Challenge 2 Exposed Misconception Residue</span>
            </div>
            <p className="text-slate-300">
              "You solved the previous problem correctly, but this new situation exposed the same issue.
              Let's explain this differently so the mental model locks in permanently."
            </p>
          </div>

          {/* Teaching Style Selector Component */}
          <TeachingStyleSelector
            selectedStyle={selectedStyle}
            onSelectStyle={handleTeachingStyleSelected}
            preferredStyle="Contrast examples"
          />

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentStepIndex(2)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-950/50"
            >
              <span>Test Knowledge with Predict & Explain (Scene 9)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PREDICT AND EXPLAIN & DELAYED RECHECK (Section 23-24 & Scenes 9-10) */}
      {currentStepIndex === 2 && (
        <div className="space-y-5">
          <PredictAndExplain onPassed={handlePredictPassed} />

          {/* Provisional Mastery Banner */}
          {isProvisionalMastery && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/70 shadow-xl space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>✓ Provisional Mastery Achieved</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                  Concept Generalization Confirmed
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                "We'll check this idea again later to make sure it sticks in long-term memory."
                In a live session, this check appears spaced over time. For this demo, you can trigger the delayed re-check now!
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setIsDelayedModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Trigger Delayed Re-Check (Scene 10)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delayed Memory Re-Check Modal */}
      <DelayedRecheckModal
        isOpen={isDelayedModalOpen}
        onClose={() => setIsDelayedModalOpen(false)}
        onSuccess={handleDelayedSuccess}
        misconceptionName="Return vs Print"
      />
    </div>
  );
};
