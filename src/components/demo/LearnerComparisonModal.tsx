import React from "react";
import { Modal } from "../common/Modal";
import { CheckCircle2, AlertTriangle, Brain } from "lucide-react";
import { Badge } from "../common/Badge";

interface LearnerComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnerComparisonModal: React.FC<LearnerComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Second Demo Path: Look-Alike Mistake Discrimination"
      subtitle="Section 39: How Re:Learn avoids naive 'wrong output → single misconception' mappings using probes."
      maxWidth="3xl"
    >
      <div className="space-y-4 text-xs text-slate-200">
        <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/60 flex items-start gap-2">
          <Brain className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Two learners can submit code that fails identical test cases. Traditional systems mark both
            as "Wrong Answer". Re:Learn uses diagnostic probes to classify the true underlying cause.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Learner A Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 font-mono text-sm">Learner A</span>
              <Badge type="conceptual" label="Conceptual Misconception" />
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-mono mb-1">Submitted Code:</div>
              <pre className="p-2.5 rounded bg-black border border-slate-800 font-mono text-[11px] text-amber-300">
{`def add(a, b):
    print(a + b) # Believes print() returns 8`}
              </pre>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-300 block">
                Probe Result (x = print(5)):
              </span>
              <div className="text-[11px] text-rose-300 font-mono">
                Selected: "5" (believed print yields value)
              </div>
            </div>

            <div className="p-2.5 rounded bg-amber-950/40 border border-amber-800/80 space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                Root Diagnosis: Return vs Print
              </div>
              <p className="text-[11px] text-slate-300">
                True conceptual fault. Learner routed into transfer reassessment & contrast examples.
              </p>
            </div>
          </div>

          {/* Learner B Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-blue-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 font-mono text-sm">Learner B</span>
              <Badge type="careless-slip" label="Careless Slip" />
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-mono mb-1">Submitted Code:</div>
              <pre className="p-2.5 rounded bg-black border border-slate-800 font-mono text-[11px] text-blue-300">
{`def add(a, b):
    total = a + b # Computed, but forgot 'return'`}
              </pre>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] font-semibold text-slate-300 block">
                Probe Result (x = print(5)):
              </span>
              <div className="text-[11px] text-emerald-300 font-mono">
                Selected: "None" (knows print yields None)
              </div>
            </div>

            <div className="p-2.5 rounded bg-blue-950/40 border border-blue-800/80 space-y-1">
              <div className="font-semibold text-blue-300 flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Root Diagnosis: Careless Return Omission
              </div>
              <p className="text-[11px] text-slate-300">
                Mental model is intact. Learner is gently reminded with a quick hint rather than repetitive reteaching.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] text-slate-400 font-mono text-center">
          Adaptive cognitive models prevent student frustration and false-positive reteaching.
        </div>
      </div>
    </Modal>
  );
};
