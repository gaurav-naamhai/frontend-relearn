import React, { useState } from "react";
import { RunResult } from "../data/mockDiagnoses";

interface TraceDrawerTabProps {
  runResult: RunResult | null;
  onStepChange?: (line: number) => void;
}

export const TraceDrawerTab: React.FC<TraceDrawerTabProps> = ({ runResult, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const traceSteps = [
    { step: 1, line: 1, varName: "a, b", val: "5, 3", desc: "Arguments passed to add()", isNone: false },
    { step: 2, line: 2, varName: "stdout", val: "'8\\n'", desc: "print() outputs characters to terminal", isNone: false },
    { step: 3, line: 2, varName: "return value", val: "None", desc: "add() ends without return; gives None", isNone: true },
    { step: 4, line: 4, varName: "result", val: "None", desc: "result variable bound to None", isNone: true },
    { step: 5, line: 5, varName: "stdout", val: "'None\\n'", desc: "print(result) outputs 'None'", isNone: true },
  ];

  const active = traceSteps[currentStep - 1] || traceSteps[0];

  const handleStep = (newStep: number) => {
    setCurrentStep(newStep);
    const target = traceSteps[newStep - 1];
    if (target && onStepChange) {
      onStepChange(target.line);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1F1F1F] text-[#CCCCCC] text-xs font-sans overflow-hidden">
      {/* Left side: Memory Table & Step controls */}
      <div className="flex-1 p-3.5 flex flex-col min-w-0 border-r border-[#2B2B2B] space-y-3 overflow-y-auto">
        {/* Controls */}
        <div className="flex items-center justify-between pb-1 border-b border-[#2B2B2B]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Execution Memory Trace</span>
            <span className="text-[11px] text-[#777777] font-mono">
              Step {currentStep} of {traceSteps.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-2.5 py-1 rounded bg-[#222222] hover:bg-[#2A2A2A] disabled:opacity-40 border border-[#333333] text-xs text-white flex items-center gap-1 cursor-pointer"
            >
              <span className="codicon codicon-arrow-left text-xs" />
              <span>Prev</span>
            </button>
            <button
              onClick={() => handleStep(Math.min(traceSteps.length, currentStep + 1))}
              disabled={currentStep === traceSteps.length}
              className="px-2.5 py-1 rounded bg-[#222222] hover:bg-[#2A2A2A] disabled:opacity-40 border border-[#333333] text-xs text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <span className="codicon codicon-arrow-right text-xs" />
            </button>
          </div>
        </div>

        {/* Current Active Step Box with Animated Variable Box */}
        <div className="p-3 rounded bg-[#181818] border border-[#333333] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#007ACC]" />
              <span className="text-white font-bold">Line {active.line}:</span>
              <span className="text-[#AAAAAA]">{active.desc}</span>
            </div>
          </div>

          {/* Animated Variable Box visual */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#141414] border border-[#3A3A3A] font-mono animate-in zoom-in-95 duration-200">
            <span className="text-[#888888] text-[11px]">{active.varName}:</span>
            <span
              className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                active.isNone
                  ? "bg-[#F14C4C]/20 text-[#F87171] border border-[#F14C4C]/40"
                  : "bg-[#2EA043]/20 text-[#4ADE80] border border-[#2EA043]/40"
              }`}
            >
              {active.val}
            </span>
          </div>
        </div>

        {/* Trace Table */}
        <div className="border border-[#2B2B2B] rounded bg-[#161616] overflow-hidden">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-[#202020] text-[#777777] border-b border-[#2B2B2B]">
              <tr>
                <th className="py-1 px-3 w-14">Step</th>
                <th className="py-1 px-3 w-16">Line</th>
                <th className="py-1 px-3 w-28">Variable</th>
                <th className="py-1 px-3">State / Bound Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B2B2B]/60">
              {traceSteps.map((row) => (
                <tr
                  key={row.step}
                  onClick={() => handleStep(row.step)}
                  className={`cursor-pointer transition-colors ${
                    row.step === currentStep
                      ? "bg-[#264F78]/30 text-white font-medium"
                      : "hover:bg-white/5 text-[#AAAAAA]"
                  }`}
                >
                  <td className="py-1 px-3 text-[#666666]">{row.step}</td>
                  <td className="py-1 px-3 text-[#DCDCAA]">Line {row.line}</td>
                  <td className="py-1 px-3 text-[#9CDCFE]">{row.varName}</td>
                  <td className="py-1 px-3">
                    <span
                      className={
                        row.isNone ? "text-[#F87171] font-bold" : "text-[#4ADE80]"
                      }
                    >
                      {row.val}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right side: Console Output */}
      <div className="w-full md:w-72 p-3.5 bg-[#181818] flex flex-col font-mono text-xs overflow-y-auto">
        <div className="text-[11px] font-sans font-semibold text-[#888888] pb-1 border-b border-[#2B2B2B] mb-2 flex items-center justify-between">
          <span>Console Output</span>
          <span className="text-[10px] text-[#666666]">Python 3.11</span>
        </div>

        <div className="space-y-2 flex-1">
          {runResult?.stdout ? (
            <div>
              <div className="text-[10px] text-[#666666] select-none">[stdout]</div>
              <pre className="text-white text-[11px] whitespace-pre-wrap">
                {runResult.stdout}
              </pre>
            </div>
          ) : (
            <div className="text-[#666666] italic text-[11px]">No terminal output</div>
          )}

          {runResult?.stderr && (
            <div className="pt-2">
              <div className="text-[10px] text-[#F14C4C] select-none">[stderr]</div>
              <pre className="text-[#F87171] text-[11px] whitespace-pre-wrap">
                {runResult.stderr}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
