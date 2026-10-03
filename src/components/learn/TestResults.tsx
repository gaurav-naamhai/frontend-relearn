import React from "react";
import { TestCase } from "../../types";
import { CheckCircle2, XCircle, Terminal } from "lucide-react";

interface TestResultsProps {
  tests: TestCase[];
  testsPassed: number;
  totalTests: number;
  stdout?: string;
  isSuccess: boolean;
  onNextProblem?: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({
  tests,
  testsPassed,
  totalTests,
  stdout,
  isSuccess,
  onNextProblem,
}) => {
  const [activeTab, setActiveTab] = React.useState<"tests" | "output">("tests");

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] border-t border-slate-800 text-xs">
      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d131f] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("tests")}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              activeTab === "tests"
                ? "bg-slate-800 text-slate-100"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Test Cases ({testsPassed}/{totalTests})
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "output"
                ? "bg-slate-800 text-slate-100"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-3 h-3" />
            Standard Output
          </button>
        </div>

        <div>
          {isSuccess ? (
            <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Tests Passed
            </span>
          ) : (
            <span className="text-rose-400 font-mono font-semibold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> {testsPassed}/{totalTests} Passed
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        {isSuccess ? (
          /* Compact Success Panel (Section 13) */
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Correct Solution</span>
              </div>
              {onNextProblem && (
                <button
                  onClick={onNextProblem}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-950/40"
                >
                  Next Problem →
                </button>
              )}
            </div>

            <div className="text-xs text-slate-300">
              You successfully used:
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300 font-mono text-[11px]">
                <li>function parameters</li>
                <li>arithmetic operations</li>
                <li>explicit return values</li>
              </ul>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
              <span className="font-semibold text-indigo-300 block mb-0.5">Remember:</span>
              A function's return value is what the caller receives in its memory. Nice work.
            </div>
          </div>
        ) : activeTab === "tests" ? (
          /* Test List */
          <div className="space-y-2">
            {tests.map((test, idx) => (
              <div
                key={test.id || idx}
                className={`p-2.5 rounded-lg border font-mono text-xs flex flex-col gap-1.5 ${
                  test.passed
                    ? "bg-emerald-950/15 border-emerald-800/40 text-emerald-200"
                    : "bg-rose-950/15 border-rose-800/40 text-rose-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {test.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-200">
                      Test {idx + 1}: {test.inputDescription}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      test.passed
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                        : "bg-rose-950 text-rose-400 border border-rose-800/50"
                    }`}
                  >
                    {test.passed ? "Passed" : "Mismatch"}
                  </span>
                </div>

                {!test.passed && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800/60 mt-1">
                    <div>
                      <span className="text-slate-400">Expected: </span>
                      <span className="text-emerald-400 font-bold">{test.expectedOutput}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Received: </span>
                      <span className="text-rose-400 font-bold">
                        {test.actualOutput || "None"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Stdout Tab */
          <div className="p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap">
            {stdout ? (
              <div>
                <span className="text-slate-400 block mb-1"># Program Standard Output:</span>
                {stdout}
              </div>
            ) : (
              <span className="text-slate-400">No output printed to standard out.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
