import React, { useState } from "react";
import { Problem, Diagnosis, ExecutionResult } from "../types";
import { executionService } from "../services/executionService";
import { diagnosisService } from "../services/diagnosisService";
import { DEMO_PROBLEM_1, MOCK_TRACE_STEPS } from "../data/mockData";
import { ProblemHeader } from "../components/learn/ProblemHeader";
import { ProblemStatement } from "../components/learn/ProblemStatement";
import { CodeEditorWrapper } from "../components/learn/CodeEditorWrapper";
import { TestResults } from "../components/learn/TestResults";
import { DiagnosisCard } from "../components/learn/DiagnosisCard";
import { ProbeQuestionModal } from "../components/learn/ProbeQuestionModal";
import { ExecutionTraceViewer } from "../components/learn/ExecutionTraceViewer";
import { ChatPanel } from "../components/learn/ChatPanel";
import {
  Sparkles,
  Bot,
  BrainCircuit,
} from "lucide-react";

interface LearnPageProps {
  onStartReassessment: (misconceptionId: string) => void;
  onNavigateNextProblem?: () => void;
  initialOpenTrace?: boolean;
  initialOpenProbe?: boolean;
}

export const LearnPage: React.FC<LearnPageProps> = ({
  onStartReassessment,
  onNavigateNextProblem,
  initialOpenTrace = false,
  initialOpenProbe = false,
}) => {
  const [problem] = useState<Problem>(DEMO_PROBLEM_1);
  const [code, setCode] = useState<string>(DEMO_PROBLEM_1.demoCode || "");
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);

  // Modals & Panels
  const [isProbeOpen, setIsProbeOpen] = useState(initialOpenProbe);
  const [isTraceOpen, setIsTraceOpen] = useState(initialOpenTrace);
  const [hasAnsweredProbe, setHasAnsweredProbe] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState<"diagnosis" | "chat">("diagnosis");

  // Execute Code
  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionResult(null);
    setDiagnosis(null);
    setHighlightedLines([]);

    try {
      const result = await executionService.runCode(code, problem);
      setExecutionResult(result);

      if (!result.success) {
        // Run cognitive diagnosis
        const diag = await diagnosisService.diagnoseCode(code, problem, result);
        setDiagnosis(diag);
        setHighlightedLines(diag.affectedLines);
        setActiveRightTab("diagnosis");
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setCode(problem.starterCode);
    setExecutionResult(null);
    setDiagnosis(null);
    setHighlightedLines([]);
    setHasAnsweredProbe(false);
  };

  const handleLoadDemoCode = () => {
    setCode(problem.demoCode || "");
  };

  const handleProbeAnswerSelected = (selectedOptionId: string) => {
    if (!diagnosis) return;
    const refined = diagnosisService.refineDiagnosisWithProbe(diagnosis, selectedOptionId);
    setDiagnosis(refined.updatedDiagnosis);
    setHasAnsweredProbe(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#070a10] overflow-hidden">
      {/* Problem Top Header */}
      <ProblemHeader problem={problem} problemIndex={12} totalProblems={40} />

      {/* Main Workspace: 3 Columns on large screens */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Problem Statement (3.5 cols) */}
        <div className="lg:col-span-4 border-r border-slate-800 bg-[#0a0d16] flex flex-col h-full overflow-hidden">
          <ProblemStatement problem={problem} />
        </div>

        {/* Center Column: Monaco Editor + Execution Output (4.5 cols) */}
        <div className="lg:col-span-4 flex flex-col h-full border-r border-slate-800 overflow-hidden bg-[#0d1117]">
          {/* Editor Container (Top half) */}
          <div className="flex-1 min-h-[300px] overflow-hidden">
            <CodeEditorWrapper
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onReset={handleResetCode}
              onLoadDemoCode={handleLoadDemoCode}
              isRunning={isRunning}
              highlightedLines={highlightedLines}
            />
          </div>

          {/* Test Results / Execution Panel (Bottom half) */}
          <div className="h-56 shrink-0 overflow-hidden">
            <TestResults
              tests={executionResult?.tests || problem.tests}
              testsPassed={executionResult?.testsPassed || 0}
              totalTests={problem.tests.length}
              stdout={executionResult?.stdout}
              isSuccess={Boolean(executionResult?.success)}
              onNextProblem={onNavigateNextProblem}
            />
          </div>
        </div>

        {/* Right Column: AI Insights & Doubt Chat (4 cols) */}
        <div className="lg:col-span-4 bg-[#0a0d16] flex flex-col h-full overflow-hidden">
          {/* Tab Switcher */}
          <div className="p-2 bg-[#0d131f] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveRightTab("diagnosis")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  activeRightTab === "diagnosis"
                    ? "bg-slate-800 text-slate-100 border border-slate-700 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI Diagnosis</span>
                {diagnosis && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveRightTab("chat")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  activeRightTab === "chat"
                    ? "bg-slate-800 text-slate-100 border border-slate-700 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>Ask Re:Learn</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              Cognitive Engine
            </div>
          </div>

          {/* Right Panel Content */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {activeRightTab === "diagnosis" ? (
              diagnosis ? (
                <DiagnosisCard
                  diagnosis={diagnosis}
                  onOpenProbe={() => setIsProbeOpen(true)}
                  onOpenTrace={() => setIsTraceOpen(true)}
                  onScrollToChat={() => setActiveRightTab("chat")}
                  onStartReassessment={() =>
                    onStartReassessment(diagnosis.primaryMisconceptionId)
                  }
                  hasAnsweredProbe={hasAnsweredProbe}
                />
              ) : isRunning ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <div className="text-xs text-slate-300 font-mono font-semibold">
                    Understanding what happened...
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                    Analyzing AST AST execution frames and checking candidate misconception hypotheses.
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-slate-300 text-xs">
                    Ready for Code Execution
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                    Click <strong>Run Code</strong> or press <code>Ctrl+Enter</code>. Re:Learn evaluates whether errors stem from syntax, careless slips, or root misconceptions.
                  </p>
                </div>
              )
            ) : (
              <ChatPanel onShowTraceModal={() => setIsTraceOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      {diagnosis?.probe && (
        <ProbeQuestionModal
          isOpen={isProbeOpen}
          onClose={() => setIsProbeOpen(false)}
          probe={diagnosis.probe}
          onAnswerSelected={handleProbeAnswerSelected}
        />
      )}

      <ExecutionTraceViewer
        isOpen={isTraceOpen}
        onClose={() => setIsTraceOpen(false)}
        traceSteps={diagnosis?.executionTrace || MOCK_TRACE_STEPS}
      />
    </div>
  );
};
