import React, { useState } from "react";
import { reassessmentService } from "../../services/reassessmentService";
import { CheckCircle2, AlertTriangle, Brain } from "lucide-react";

interface PredictAndExplainProps {
  onPassed: () => void;
}

export const PredictAndExplain: React.FC<PredictAndExplainProps> = ({ onPassed }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [explanation, setExplanation] = useState("");
  const [result, setResult] = useState<{
    predictionCorrect: boolean;
    explanationQuality: "sound" | "guessing" | "misconception";
    feedback: string;
  } | null>(null);

  const codeSnippet = `def double(n):
    return n * 2

def show_double(n):
    print(n * 2)

a = double(4)
b = show_double(4)
print(a, b)`;

  const options = [
    "8 8",
    "8 None",
    "None 8",
    "8 followed by an Error",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption === null) return;

    const evaluation = reassessmentService.evaluatePredictAndExplain(
      selectedOption,
      1, // correct index is 1 ("8 None")
      explanation
    );
    setResult(evaluation);

    if (evaluation.predictionCorrect && evaluation.explanationQuality === "sound") {
      setTimeout(() => {
        onPassed();
      }, 1800);
    }
  };

  return (
    <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-purple-400" />
            Predict & Explain Assessment Mode
          </h4>
          <p className="text-slate-400 text-xs mt-0.5">
            Demonstrate your mental model by predicting the runtime outcome and explaining why.
          </p>
        </div>
        <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300 font-mono text-[11px]">
          Concept Transfer
        </span>
      </div>

      {/* Code to predict */}
      <div className="p-3.5 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 whitespace-pre-wrap">
        {codeSnippet}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prediction Question */}
        <div className="space-y-2">
          <span className="font-semibold text-slate-200 text-xs block font-mono">
            What will be printed by the final line: print(a, b)?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explain Your Answer In One Sentence */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-200 text-xs block font-mono">
            Explain your answer in one sentence:
          </label>
          <input
            type="text"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="e.g. double returns the integer 8 while show_double only prints and returns None"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Evaluation Output */}
        {result && (
          <div
            className={`p-3.5 rounded-xl border space-y-1.5 animate-in fade-in duration-300 ${
              result.predictionCorrect && result.explanationQuality === "sound"
                ? "bg-emerald-950/40 border-emerald-700/80 text-emerald-200"
                : result.predictionCorrect && result.explanationQuality === "guessing"
                ? "bg-amber-950/40 border-amber-700/80 text-amber-200"
                : "bg-rose-950/40 border-rose-700/80 text-rose-200"
            }`}
          >
            <div className="flex items-center gap-2 font-bold font-mono text-xs">
              {result.predictionCorrect && result.explanationQuality === "sound" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cognitive Understanding Confirmed</span>
                </>
              ) : result.explanationQuality === "guessing" ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Prediction Correct, but Rationale Weak</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Misconception Exposed</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed">{result.feedback}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={selectedOption === null || !explanation.trim()}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs text-white transition-all shadow-md shadow-purple-950/50"
          >
            Submit Prediction & Explanation
          </button>
        </div>
      </form>
    </div>
  );
};
