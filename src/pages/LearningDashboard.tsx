import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Send,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  FileCode,
  Tag,
  BookOpen,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { Problem, TestCase } from "../types";
import { executionService } from "../services/executionService";
import { diagnosisService } from "../services/diagnosisService";
import { DEMO_PROBLEM_1, DEMO_PROBLEM_DISCOUNT } from "../data/mockData";
import { chatService } from "../services/chatService";

interface LearningDashboardProps {
  conceptId?: string;
  onMoveForward: () => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  conceptId: _conceptId = "functions",
  onMoveForward,
}) => {
  // 1. Concept info & Question Generation
  const [currentProblem, setCurrentProblem] = useState<Problem>(DEMO_PROBLEM_1);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

  // 2. Program input space & code state
  const [code, setCode] = useState<string>(DEMO_PROBLEM_1.demoCode || "");
  const [isCompiling, setIsCompiling] = useState(false);
  const [hasCompiled, setHasCompiled] = useState(false);

  // 3. Results & Line-by-line insight
  const [compileResult, setCompileResult] = useState<{
    success: boolean;
    stdout: string;
    returnValue?: string;
    tests: TestCase[];
    passedCount: number;
  } | null>(null);

  const [lineInsights, setLineInsights] = useState<{
    line: number;
    faultyCode: string;
    errorType: string;
    message: string;
    howToFix: string;
  } | null>(null);

  // 4. Text box below insights
  const [insightQuery, setInsightQuery] = useState("");
  const [insightReplies, setInsightReplies] = useState<{ query: string; reply: string }[]>([]);
  const [isAnsweringQuery, setIsAnsweringQuery] = useState(false);

  // 5. Optional Extra Practice & Reassessment Section
  const [showPracticeSection, setShowPracticeSection] = useState(false);
  const [practiceCode, setPracticeCode] = useState(
    "def calculate_tax(subtotal, rate):\n    # Return the total price with tax\n    return subtotal + (subtotal * rate)"
  );
  const [practiceResult, setPracticeResult] = useState<"idle" | "success" | "error">("idle");

  const debounceTimerRef = useRef<any>(null);

  // Auto-compile as user types (debounced)
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      runCompile(newCode, false);
    }, 1200);
  };

  // Compile & Run execution
  const runCompile = async (codeToRun: string, manual = true) => {
    if (manual) setIsCompiling(true);

    try {
      const res = await executionService.runCode(codeToRun, currentProblem);
      setCompileResult({
        success: res.success,
        stdout: res.stdout,
        returnValue: res.returnValue,
        tests: res.tests,
        passedCount: res.testsPassed,
      });
      setHasCompiled(true);

      if (!res.success) {
        const diag = await diagnosisService.diagnoseCode(codeToRun, currentProblem, res);
        setLineInsights({
          line: diag.affectedLines[0] || 2,
          faultyCode: diag.faultyCodeSnippet,
          errorType: "Conceptual Misconception: Return vs Print",
          message:
            "Your function printed the computed value to stdout, but handed None back to the caller.",
          howToFix:
            "In Python, print() only displays characters on the monitor. To send data back to caller variables or expressions, use 'return a + b'.",
        });
      } else {
        setLineInsights(null);
      }
    } finally {
      if (manual) setIsCompiling(false);
    }
  };

  // Initial compilation on mount
  useEffect(() => {
    runCompile(code, false);
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [currentProblem]);

  // Dynamic Question Generation handler
  const handleGenerateNewQuestion = () => {
    setIsGeneratingQuestion(true);
    setTimeout(() => {
      const nextProb =
        currentProblem.id === DEMO_PROBLEM_1.id
          ? DEMO_PROBLEM_DISCOUNT
          : DEMO_PROBLEM_1;
      setCurrentProblem(nextProb);
      setCode(nextProb.demoCode || nextProb.starterCode);
      setIsGeneratingQuestion(false);
      setInsightReplies([]);
      setShowPracticeSection(false);
    }, 500);
  };

  // Handle Query below insights box
  const handleSendInsightQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!insightQuery.trim() || isAnsweringQuery) return;

    const userText = insightQuery;
    setInsightQuery("");
    setIsAnsweringQuery(true);

    try {
      const resp = await chatService.askQuestion(userText, 1);
      setInsightReplies((prev) => [
        ...prev,
        { query: userText, reply: resp.responseMessage.text },
      ]);
    } finally {
      setIsAnsweringQuery(false);
    }
  };

  const handleTestPractice = () => {
    if (practiceCode.includes("return")) {
      setPracticeResult("success");
    } else {
      setPracticeResult("error");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-slate-200">
      {/* 1. Concept Name Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Python Fundamentals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span>Functions & Return Values</span>
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
              Medium
            </span>
          </h1>
        </div>

        <button
          onClick={handleGenerateNewQuestion}
          disabled={isGeneratingQuestion}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 transition-colors self-start sm:self-auto"
          title="Generate a new verified question in this concept"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isGeneratingQuestion ? "animate-spin" : ""}`} />
          <span>Generate New Question</span>
        </button>
      </div>

      {/* 2. Space for Question Generation at the Top */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            {currentProblem.title}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Est. Time: {currentProblem.estimatedTime}
          </span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed">
          {currentProblem.description}
        </p>

        {/* Examples */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {currentProblem.examples.map((ex, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-black/60 border border-slate-800/80 font-mono text-xs flex items-center justify-between"
            >
              <div>
                <span className="text-slate-500 mr-2">Input:</span>
                <span className="text-slate-200">{ex.input}</span>
              </div>
              <div>
                <span className="text-slate-500 mr-2">Returns:</span>
                <span className="text-emerald-400 font-bold">{ex.output}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Space to Type Your Program & Compile Button */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        {/* Editor Top Bar */}
        <div className="p-3 bg-[#0d121c] border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-slate-200 font-semibold">solution.py</span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              (Live Auto-Compile Active)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCode(currentProblem.starterCode)}
              className="p-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              title="Reset starter template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Compile Button */}
            <button
              onClick={() => runCompile(code, true)}
              disabled={isCompiling}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition-all hover:scale-[1.02]"
            >
              {isCompiling ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Compile & Run</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Monaco Editor Surface */}
        <div className="h-56 min-h-[220px]">
          <Editor
            height="100%"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => handleCodeChange(val || "")}
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              minimap: { enabled: false },
              lineNumbers: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>

        {/* Compile Result Area */}
        {hasCompiled && compileResult && (
          <div className="p-4 bg-[#0a0e18] border-t border-slate-800 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
                Execution Output
              </span>
              <span
                className={`font-semibold flex items-center gap-1.5 ${
                  compileResult.success ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {compileResult.success ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> All Tests Passed
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" /> Tests Failed (0/{compileResult.tests.length})
                  </>
                )}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-black/60 border border-slate-850">
                <span className="text-slate-500 mr-2">Terminal stdout:</span>
                <span className="text-slate-200">{compileResult.stdout ? `"${compileResult.stdout.replace('\n', ' ')}"` : "(none)"}</span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-slate-850">
                <span className="text-slate-500 mr-2">Function return:</span>
                <span className={compileResult.success ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                  {compileResult.returnValue || "None"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Line-by-Line Error Insights */}
      {lineInsights && (
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-800/60 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono font-bold text-xs border border-amber-800">
                Line {lineInsights.line} Insight
              </span>
              <span className="text-xs font-semibold text-amber-200">
                {lineInsights.errorType}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-amber-300">
            <code>Line {lineInsights.line}: {lineInsights.faultyCode}</code>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {lineInsights.message}
          </p>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
            <span className="font-semibold text-indigo-300 font-mono text-[11px] block">
              How to fix:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {lineInsights.howToFix}
            </p>
          </div>

          {/* 5. Text Box Below Insights Box */}
          <div className="pt-3 border-t border-amber-900/40 space-y-3">
            <span className="text-[11px] font-mono text-slate-400 block">
              Ask about this insight or line:
            </span>

            {/* Conversation Q&A stream */}
            {insightReplies.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {insightReplies.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-indigo-300">Q: {item.query}</div>
                    <div className="text-slate-300 leading-relaxed">{item.reply}</div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSendInsightQuery} className="flex gap-2">
              <input
                type="text"
                value={insightQuery}
                onChange={(e) => setInsightQuery(e.target.value)}
                placeholder="e.g. Why doesn't print() give the value back to result?"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
              />
              <button
                type="submit"
                disabled={!insightQuery.trim() || isAnsweringQuery}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                {isAnsweringQuery ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Ask</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. Extra Practice & Reassessment Section (Completely Optional) */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-100">
              Ready for the next concept?
            </h3>
            <p className="text-xs text-slate-400">
              Move forward directly, or take an optional practice transfer challenge.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Optional Practice Toggle Button */}
            <button
              onClick={() => setShowPracticeSection(!showPracticeSection)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <span>{showPracticeSection ? "Hide Practice" : "Additional Practice"}</span>
              {showPracticeSection ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Direct Move Forward Action */}
            <button
              onClick={onMoveForward}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white shadow-md shadow-indigo-950/50 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expanded Practice & Reassessment Section */}
        {showPracticeSection && (
          <div className="pt-4 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-300">
                  Optional Reassessment: Calculate Sales Tax
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
                  Concept Transfer
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Write <code>calculate_tax(subtotal, rate)</code> that calculates the tax and returns the total final price (subtotal + subtotal * rate).
              </p>
            </div>

            <div className="space-y-2">
              <textarea
                rows={3}
                value={practiceCode}
                onChange={(e) => setPracticeCode(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={handleTestPractice}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" />
                  <span>Verify Practice</span>
                </button>

                {practiceResult === "success" && (
                  <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Transfer Success! Concept Mastered.
                  </span>
                )}
                {practiceResult === "error" && (
                  <span className="text-xs text-rose-400 font-mono font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Function must return the calculated value.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
