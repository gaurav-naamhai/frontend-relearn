import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { TraceStep } from "../../types";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
  Layers,
} from "lucide-react";

interface ExecutionTraceViewerProps {
  isOpen: boolean;
  onClose: () => void;
  traceSteps: TraceStep[];
}

export const ExecutionTraceViewer: React.FC<ExecutionTraceViewerProps> = ({
  isOpen,
  onClose,
  traceSteps,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= traceSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, traceSteps.length]);

  if (!traceSteps || traceSteps.length === 0) return null;

  const currentStep = traceSteps[currentStepIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Interactive Execution Trace"
      subtitle="Step through your program in memory to observe variables, output, and return flow."
      maxWidth="3xl"
    >
      <div className="space-y-4 text-xs text-slate-200">
        {/* Progress & Step Controls */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-cyan-400">
              Step {currentStepIndex + 1} of {traceSteps.length}
            </span>
            <span className="text-slate-500 font-mono">|</span>
            <span className="text-slate-400 font-mono text-[11px]">
              Executing Line {currentStep.line}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentStepIndex(0)}
              className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Reset to step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title={isPlaying ? "Pause auto-step" : "Auto-play execution"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
              disabled={currentStepIndex === 0}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              onClick={() => setCurrentStepIndex((p) => Math.min(traceSteps.length - 1, p + 1))}
              disabled={currentStepIndex === traceSteps.length - 1}
              className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs flex items-center gap-1 shadow-md shadow-cyan-950/40"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-cyan-400 h-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / traceSteps.length) * 100}%` }}
          />
        </div>

        {/* Current Active Code & Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Code Line Highlight */}
          <div className="p-3.5 rounded-xl bg-black/90 border border-slate-800 space-y-2 font-mono">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              Active Instruction (Line {currentStep.line})
            </div>
            <div className="p-2.5 rounded bg-slate-900/90 border border-cyan-500/50 text-cyan-300 text-sm font-semibold">
              <code>{currentStep.code}</code>
            </div>
            <div className="text-slate-300 font-sans text-xs leading-relaxed pt-1">
              {currentStep.explanation}
            </div>
          </div>

          {/* Environment Stack & Variables */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider font-mono">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" />
                Variable Memory Frame
              </span>
              <span className="text-slate-500">add() scope</span>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {Object.entries(currentStep.variables).map(([name, val]) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800/80"
                >
                  <span className="text-indigo-300 font-semibold">{name}</span>
                  <span className="text-slate-200">{String(val)}</span>
                </div>
              ))}
            </div>

            {/* Special Highlight: Return Value vs Stdout */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-amber-950/30 border border-amber-800/50">
                <span className="text-amber-300 font-semibold">Terminal Stdout:</span>
                <span className="font-mono font-bold text-amber-200">
                  {currentStep.stdout ? `"${currentStep.stdout}"` : "(none)"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-rose-950/30 border border-rose-800/50">
                <span className="text-rose-300 font-semibold">Caller Return Value:</span>
                <span className="font-mono font-bold text-rose-300">
                  {currentStep.returnValue || "None (Default)"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Insight note */}
        <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-[11px] text-indigo-200 leading-relaxed">
          <span className="font-bold text-indigo-300 mr-1">Trace Revelation:</span>
          Notice that while the terminal output printed 8, the function completed without returning anything.
          Python assigned <code className="bg-slate-900 px-1 py-0.5 rounded font-mono text-amber-300">None</code> to the caller variable.
        </div>
      </div>
    </Modal>
  );
};
