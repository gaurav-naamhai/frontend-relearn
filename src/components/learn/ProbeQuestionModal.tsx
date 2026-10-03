import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { ProbeQuestion } from "../../types";
import { CheckCircle2, HelpCircle, Sparkles, ArrowRight } from "lucide-react";

interface ProbeQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  probe: ProbeQuestion;
  onAnswerSelected: (optionId: string) => void;
}

export const ProbeQuestionModal: React.FC<ProbeQuestionModalProps> = ({
  isOpen,
  onClose,
  probe,
  onAnswerSelected,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string) => {
    if (submitted) return;
    setSelectedId(id);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    setSubmitted(true);
    onAnswerSelected(selectedId);
  };

  const handleDone = () => {
    onClose();
  };

  const selectedOpt = probe.options.find((o) => o.id === selectedId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Diagnostic Probe Question"
      subtitle="Before we finalize what went wrong, let's distinguish between look-alike possibilities."
      maxWidth="xl"
    >
      <div className="space-y-4 text-xs text-slate-200">
        <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-800/60 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Mistakes in code often look identical on the surface. Answering this quick
            conceptual probe isolates your exact mental model from a careless slip.
          </p>
        </div>

        {/* Code Snippet */}
        <div className="p-4 rounded-xl bg-black/80 border border-slate-800 text-center font-mono text-sm sm:text-base text-amber-300">
          <code>{probe.codeSnippet}</code>
        </div>

        {/* Question */}
        <div className="font-semibold text-sm text-slate-100">
          {probe.question}
        </div>

        {/* Options */}
        <div className="space-y-2">
          {probe.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            let optStyle =
              "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850";

            if (isSelected) {
              optStyle = "bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-md";
            }
            if (submitted) {
              if (opt.isCorrect) {
                optStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200";
              } else if (isSelected && !opt.isCorrect) {
                optStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={submitted}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${optStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-slate-800 border border-slate-700 font-mono font-bold flex items-center justify-center text-xs text-slate-300">
                    {opt.label}
                  </span>
                  <span className="font-mono text-sm">{opt.text}</span>
                </div>

                {submitted && opt.isCorrect && (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 text-xs">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Result Explanation */}
        {submitted && selectedOpt && (
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/50 space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Diagnostic Model Updated</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {probe.explanation}
            </p>
            {selectedOpt.diagnosisShift && (
              <p className="text-indigo-300 font-mono text-[11px] pt-1">
                {selectedOpt.diagnosisShift}
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedId}
              className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors ${
                selectedId
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950/50"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              <span>Submit Answer</span>
            </button>
          ) : (
            <button
              onClick={handleDone}
              className="px-4 py-2 rounded-lg font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-950/50"
            >
              <span>View Updated Diagnosis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
