import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

interface DelayedRecheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  misconceptionName?: string;
}

export const DelayedRecheckModal: React.FC<DelayedRecheckModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  misconceptionName = "Return vs Print",
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  const options = [
    { label: "A", text: "The numeric result: n * 10", isCorrect: false },
    { label: "B", text: "Python's None object", isCorrect: true },
    { label: "C", text: "A formatted string representation", isCorrect: false },
    { label: "D", text: "0 by default", isCorrect: false },
  ];

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setIsSubmitted(true);
    const correct = options[selectedIdx].isCorrect;
    setPassed(correct);

    if (correct) {
      // Subtle victory celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#10B981", "#6366F1", "#8B5CF6"],
        });
      } catch (_err) {
        // ignore
      }
    }
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delayed Knowledge Re-Check"
      subtitle="Ensuring long-term cognitive retention after initial mastery."
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs text-slate-200">
        <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/60 flex items-center gap-2 text-indigo-300">
          <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>It's been a while. Let's verify this concept remains consolidated in memory.</span>
        </div>

        <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-center text-sm text-amber-300">
          <code>def calculate_bonus(salary):{"\n"}    print(salary * 0.1)</code>
        </div>

        <div className="font-semibold text-sm text-slate-100">
          What does <code>calculate_bonus(50000)</code> hand back to its caller?
        </div>

        <div className="space-y-2">
          {options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            let style = "bg-slate-900 border-slate-800 hover:border-slate-700";

            if (isSelected) {
              style = "bg-indigo-950/80 border-indigo-500 text-indigo-200";
            }
            if (isSubmitted) {
              if (opt.isCorrect) {
                style = "bg-emerald-950/80 border-emerald-500 text-emerald-200";
              } else if (isSelected && !opt.isCorrect) {
                style = "bg-rose-950/80 border-rose-500 text-rose-200";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !isSubmitted && setSelectedIdx(idx)}
                disabled={isSubmitted}
                className={`w-full p-3 rounded-lg border text-left font-mono text-xs flex items-center gap-3 transition-colors ${style}`}
              >
                <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-400">
                  {opt.label}
                </span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div
            className={`p-3.5 rounded-xl border space-y-1 animate-in fade-in duration-300 ${
              passed
                ? "bg-emerald-950/40 border-emerald-700/80 text-emerald-200"
                : "bg-rose-950/40 border-rose-700/80 text-rose-200"
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              {passed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Misconception Permanently Resolved</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Concept Needs Further Practice</span>
                </>
              )}
            </div>
            <p className="text-xs">
              {passed
                ? `Outstanding! You remembered that print() returns None. '${misconceptionName}' has been officially graduated to Resolved in your learner model.`
                : "The return statement was omitted, meaning None was handed back. We will schedule an extra practice challenge."}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIdx === null}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-xs transition-colors"
            >
              Verify Memory
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-950/50"
            >
              Update Learner Profile & Return
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
