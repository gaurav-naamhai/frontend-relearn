import { useState, useEffect, useRef, useCallback } from "react";
import { Problem } from "../../../types";
import { DEMO_PROBLEM_1, DEMO_PROBLEM_DISCOUNT } from "../../../data/mockData";
import { executionService } from "../../../services/executionService";
import { diagnosisService } from "../../../services/diagnosisService";
import { chatService } from "../../../services/chatService";
import {
  LineDiagnosis,
  RunResult,
  MOCK_SCENARIOS,
  ConceptItem,
  INITIAL_CONCEPTS,
} from "../data/mockDiagnoses";
import { LoopNodeId } from "../LoopTrack";
import { DrawerTabId } from "../Drawer/Drawer";

export type WorkbenchStatus = "idle" | "editing" | "running" | "failed" | "passed" | "reassessing";
export type EditorTabId = "solution.py" | "reassessment";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  codeSnippet?: string;
  tier?: number;
  timestamp: string;
}

export interface UseWorkbenchOptions {
  conceptId?: string;
  initialProblem?: Problem;
  onAdvanceLesson?: () => void;
}

export function useWorkbenchMachine(options: UseWorkbenchOptions = {}) {
  const { onAdvanceLesson } = options;

  // Problem and editor code
  const [currentProblem, setCurrentProblem] = useState<Problem>(
    options.initialProblem || DEMO_PROBLEM_1
  );
  const [code, setCode] = useState<string>(MOCK_SCENARIOS.conceptual.code);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [currentScenario, setCurrentScenario] = useState<
    "conceptual" | "logic" | "syntax" | "passed" | "custom"
  >("conceptual");

  // State machine status & run tracking
  const [status, setStatus] = useState<WorkbenchStatus>("failed");
  const [hasRunAtLeastOnce, setHasRunAtLeastOnce] = useState<boolean>(true);

  // Tabs & Views
  const [activeEditorTab, setActiveEditorTab] = useState<EditorTabId>("solution.py");
  const [openTabs, setOpenTabs] = useState<EditorTabId[]>(["solution.py"]);

  // Drawer (Tests, Doubt Chat, Trace) - collapsed by default!
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<DrawerTabId>("tests");
  const [drawerDismissCount, setDrawerDismissCount] = useState<number>(0);

  // Lesson Strip
  const [isStripCollapsed, setIsStripCollapsed] = useState<boolean>(false);

  // Learning Loop Track
  const [loopNode, setLoopNode] = useState<LoopNodeId>("diagnose");
  const [completedLoopNodes, setCompletedLoopNodes] = useState<LoopNodeId[]>(["attempt"]);

  // Concepts Dock
  const [concepts, setConcepts] = useState<ConceptItem[]>(INITIAL_CONCEPTS);

  // Diagnostics & Breakdown
  const [runResult, setRunResult] = useState<RunResult | null>(MOCK_SCENARIOS.conceptual);
  const [activeDiagnosticIndex, setActiveDiagnosticIndex] = useState<number>(0);
  const [dismissedLines, setDismissedLines] = useState<Set<number>>(new Set());
  const [breakdownMode, setBreakdownMode] = useState<boolean>(false);
  const [autoCompile, setAutoCompile] = useState<boolean>(true);

  // Success Moment & Strengthen Bar
  const [gutterSweepActive, setGutterSweepActive] = useState<boolean>(false);
  const [floatingXpToast, setFloatingXpToast] = useState<boolean>(false);
  const [showStrengthenBar, setShowStrengthenBar] = useState<boolean>(false);

  // Doubt Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "initial-assistant",
      role: "assistant",
      text: "Line 2 uses print(), which only displays characters on the monitor. To hand values back to result, use return.",
      tier: 1,
      timestamp: "Just now",
    },
  ]);
  const [contextChips, setContextChips] = useState<string[]>(["solution.py:2"]);
  const [tutoringTier, setTutoringTier] = useState<number>(1);
  const [isAnsweringChat, setIsAnsweringChat] = useState<boolean>(false);

  // Command Palette
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Cursor position
  const [cursorPosition, setCursorPosition] = useState<{ line: number; col: number }>({
    line: 2,
    col: 5,
  });

  const debounceTimerRef = useRef<any>(null);

  // Execution runner
  const runExecution = useCallback(
    async (codeToRun: string, manual = true) => {
      setStatus("running");
      setHasRunAtLeastOnce(true);

      // Auto-collapse strip after first run
      if (!isStripCollapsed) {
        setIsStripCollapsed(true);
      }

      await new Promise((r) => setTimeout(r, 400));

      try {
        const pyodideRes = await executionService.runCode(codeToRun, currentProblem);

        if (pyodideRes.success) {
          const passResult: RunResult = {
            scenarioId: "passed",
            name: "Passed",
            code: codeToRun,
            tests: pyodideRes.tests.map((t: any) => ({
              name: t.name,
              passed: t.passed,
              expected: t.expected,
              got: t.actual || t.expected,
            })),
            diagnoses: [],
            stdout: pyodideRes.stdout || "8\n",
            returnValue: pyodideRes.returnValue || "8",
          };

          setRunResult(passResult);
          setStatus("passed");

          // Advance Loop Track to Transfer
          setLoopNode("transfer");
          setCompletedLoopNodes(["attempt", "diagnose", "fix"]);

          // Trigger Gutter Sweep + Floating XP + Strengthen Bar
          setGutterSweepActive(true);
          setFloatingXpToast(true);
          setShowStrengthenBar(true);

          setTimeout(() => setGutterSweepActive(false), 800);
          setTimeout(() => setFloatingXpToast(false), 2400);

          // Update concept state to Verified once (amber recurring ring)
          setConcepts((prev) =>
            prev.map((c) =>
              c.id === "return-vs-print"
                ? {
                    ...c,
                    state: "recurring",
                    description: "Verified once. One more transfer check locks in mastery.",
                    history: [...c.history, "pass"],
                  }
                : c
            )
          );
        } else {
          // Failure diagnosed
          const diag = await diagnosisService.diagnoseCode(codeToRun, currentProblem, pyodideRes);
          const failingLine = diag.affectedLines[0] || 2;

          let diagnosisData: LineDiagnosis;
          if (codeToRun.includes("print(") && !codeToRun.includes("return")) {
            diagnosisData = MOCK_SCENARIOS.conceptual.diagnoses[0];
          } else if (codeToRun.includes("-") && !codeToRun.includes("+")) {
            diagnosisData = MOCK_SCENARIOS.logic.diagnoses[0];
          } else if (pyodideRes.stderr?.includes("SyntaxError")) {
            diagnosisData = MOCK_SCENARIOS.syntax.diagnoses[0];
          } else {
            diagnosisData = {
              line: failingLine,
              startCol: 1,
              endCol: 30,
              status: "error",
              annotation: "← unexpected return value",
              errorType: "logic",
              headline: diag.whatHappened || "Output did not match test expectation.",
              caption: "Review caller return value.",
              diagramSteps: [
                { id: "call", label: "add(5, 3)", type: "call" },
                { id: "calc", label: "evaluated", sublabel: "result", type: "print" },
                { id: "ret", label: "wrong output", type: "return", strike: true },
              ],
              hints: [
                "Review the return expression on line " + failingLine,
                "Make sure your function evaluates the sum and returns it.",
                "Replace print with return.",
                {
                  diff: "-    # incorrect\n+    # correct",
                  fixedCode: currentProblem.correctCode || codeToRun,
                },
              ],
              whyDeep: {
                misconception: "Functions must return values directly to callers.",
                contrastExample: "return a + b",
              },
            };
          }

          const failResult: RunResult = {
            scenarioId: "conceptual",
            name: "Failed execution",
            code: codeToRun,
            tests: pyodideRes.tests.map((t: any) => ({
              name: t.name,
              passed: t.passed,
              expected: t.expected,
              got: t.actual || "None",
            })),
            diagnoses: [diagnosisData],
            stdout: pyodideRes.stdout,
            stderr: pyodideRes.stderr,
            returnValue: pyodideRes.returnValue,
          };

          setRunResult(failResult);
          setStatus("failed");
          setActiveDiagnosticIndex(0);
          setDismissedLines(new Set());
          setShowStrengthenBar(false);

          // Loop Track: Diagnose
          setLoopNode("diagnose");
          setCompletedLoopNodes(["attempt"]);

          // Auto-open drawer only if user hasn't dismissed twice
          if (drawerDismissCount < 2) {
            // keep drawer closed or gentle notice, chips in strip already show pass/fail
          }
        }
      } catch (err: any) {
        setStatus("failed");
      }
    },
    [currentProblem, drawerDismissCount, isStripCollapsed]
  );

  // Switch to one of the 4 mock scenarios
  const switchMockScenario = useCallback(
    (scenarioId: "conceptual" | "logic" | "syntax" | "passed") => {
      const scenario = MOCK_SCENARIOS[scenarioId];
      if (!scenario) return;

      setCurrentScenario(scenarioId);
      setCode(scenario.code);
      setRunResult(scenario);
      setIsDirty(false);
      setActiveDiagnosticIndex(0);
      setDismissedLines(new Set());

      if (scenarioId === "passed") {
        setStatus("passed");
        setLoopNode("transfer");
        setCompletedLoopNodes(["attempt", "diagnose", "fix"]);
        setShowStrengthenBar(true);
        setConcepts((prev) =>
          prev.map((c) =>
            c.id === "return-vs-print" ? { ...c, state: "recurring" } : c
          )
        );
      } else {
        setStatus("failed");
        setLoopNode("diagnose");
        setCompletedLoopNodes(["attempt"]);
        setShowStrengthenBar(false);
        setActiveEditorTab("solution.py");
      }
    },
    []
  );

  // Debounced auto-compile when typing
  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      setIsDirty(true);
      setStatus("editing");

      if (autoCompile) {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
          runExecution(newCode, false);
        }, 800);
      }
    },
    [autoCompile, runExecution]
  );

  // Reset to starter code
  const handleResetCode = useCallback(() => {
    const starter = currentProblem.starterCode || "def add(a, b):\n    # Write your solution here\n    pass\n";
    setCode(starter);
    setIsDirty(false);
    setStatus("idle");
    setRunResult(null);
    setShowStrengthenBar(false);
  }, [currentProblem]);

  // Generate new question
  const handleGenerateNewQuestion = useCallback(() => {
    const nextProb =
      currentProblem.id === DEMO_PROBLEM_1.id ? DEMO_PROBLEM_DISCOUNT : DEMO_PROBLEM_1;
    setCurrentProblem(nextProb);
    const starter = nextProb.demoCode || nextProb.starterCode;
    setCode(starter);
    setIsDirty(false);
    setStatus("idle");
    setRunResult(null);
    setShowStrengthenBar(false);
    setActiveEditorTab("solution.py");
    setOpenTabs(["solution.py"]);
  }, [currentProblem]);

  // Apply Tier 4 fix
  const applyTier4Fix = useCallback(
    (fixedCode: string) => {
      setCode(fixedCode);
      setLoopNode("fix");
      runExecution(fixedCode, true);
    },
    [runExecution]
  );

  // Add context chip & focus doubt chat
  const handleAskAboutLine = useCallback((lineNum: number) => {
    const chip = `solution.py:${lineNum}`;
    setContextChips((prev) => (prev.includes(chip) ? prev : [...prev, chip]));
    setActiveDrawerTab("doubt-chat");
    setIsDrawerOpen(true);
  }, []);

  const handleRemoveContextChip = useCallback((chipToRemove: string) => {
    setContextChips((prev) => prev.filter((c) => c !== chipToRemove));
  }, []);

  // Send Doubt Chat message
  const handleSendChatMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isAnsweringChat) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        text,
        timestamp: "Just now",
      };

      setChatMessages((prev) => [...prev, userMsg]);
      setIsAnsweringChat(true);

      try {
        const lower = text.toLowerCase();
        let replyText = "";
        let tierUsed = tutoringTier;

        if (lower.includes("give me the answer") || lower.includes("write the code")) {
          replyText =
            "I want to help you grasp this! Consider this: print() sends characters to screen, while return passes data to caller variables.";
        } else if (lower.includes("why does print") || lower.includes("none")) {
          replyText =
            "print() is an I/O procedure that writes text to stdout. Its formal return value in Python is None. To give values back to caller expressions, write return a + b.";
        } else if (lower.includes("example")) {
          replyText =
            "Here is a contrast:\n```python\ndef square(n):\n    return n * n\n\nans = square(5)  # ans is 25\n```\nIf square used print(), ans would be None.";
        } else {
          const resp = await chatService.askQuestion(text, tutoringTier);
          replyText = resp.responseMessage.text;
        }

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: replyText,
          tier: tierUsed,
          timestamp: "Just now",
        };

        setChatMessages((prev) => [...prev, assistantMsg]);
      } catch (e) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `assistant-err-${Date.now()}`,
            role: "assistant",
            text: "Remember: in Python, a function hands back None unless you explicitly write return.",
            tier: tutoringTier,
            timestamp: "Just now",
          },
        ]);
      } finally {
        setIsAnsweringChat(false);
      }
    },
    [isAnsweringChat, tutoringTier]
  );

  // Start Practice Path
  const handleStartPractice = useCallback(() => {
    setOpenTabs((prev) => (prev.includes("reassessment") ? prev : [...prev, "reassessment"]));
    setActiveEditorTab("reassessment");
    setShowStrengthenBar(false);
  }, []);

  // Complete Practice Path
  const handleCompletePractice = useCallback(() => {
    setLoopNode("verified");
    setCompletedLoopNodes(["attempt", "diagnose", "fix", "transfer", "verified"]);
    setConcepts((prev) =>
      prev.map((c) =>
        c.id === "return-vs-print"
          ? {
              ...c,
              state: "resolved",
              description: "Mastered. Distinguishes print() from return across all call contexts.",
              history: [...c.history, "pass"],
            }
          : c
      )
    );
  }, []);

  // Advance to next lesson
  const handleNextLesson = useCallback(() => {
    if (onAdvanceLesson) {
      onAdvanceLesson();
    } else {
      handleGenerateNewQuestion();
    }
  }, [onAdvanceLesson, handleGenerateNewQuestion]);

  // URL Query Parameters support for deep-linking & dev inspection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const scen = params.get("scenario");
    if (scen === "passed" || scen === "logic" || scen === "syntax" || scen === "conceptual") {
      switchMockScenario(scen);
    }
    if (params.get("drawer") === "open" || params.get("drawer") === "true") {
      setIsDrawerOpen(true);
    }
    const dTab = params.get("drawerTab");
    if (dTab === "tests" || dTab === "doubt-chat" || dTab === "trace") {
      setActiveDrawerTab(dTab as DrawerTabId);
    }
    if (params.get("tab") === "practice") {
      handleStartPractice();
    }
    if (params.get("collapsed") === "true") {
      setIsStripCollapsed(true);
    }
  }, [switchMockScenario, handleStartPractice]);

  return {
    // Problem & Code
    currentProblem,
    code,
    setCode,
    isDirty,
    currentScenario,
    switchMockScenario,
    handleCodeChange,
    handleResetCode,
    handleGenerateNewQuestion,

    // Status & Loop Track
    status,
    runResult,
    runExecution,
    autoCompile,
    setAutoCompile,
    hasRunAtLeastOnce,
    loopNode,
    completedLoopNodes,

    // Lesson Strip
    isStripCollapsed,
    setIsStripCollapsed,

    // Diagnostics & Markers
    activeDiagnosticIndex,
    setActiveDiagnosticIndex,
    dismissedLines,
    setDismissedLines,
    breakdownMode,
    setBreakdownMode,
    applyTier4Fix,

    // Concepts & Dock
    concepts,
    setConcepts,

    // Drawer
    isDrawerOpen,
    setIsDrawerOpen,
    activeDrawerTab,
    setActiveDrawerTab,
    setDrawerDismissCount,

    // Success & Strengthen Bar
    gutterSweepActive,
    floatingXpToast,
    showStrengthenBar,
    setShowStrengthenBar,
    handleStartPractice,
    handleCompletePractice,
    handleNextLesson,

    // Tabs & Layout
    activeEditorTab,
    setActiveEditorTab,
    openTabs,
    setOpenTabs,

    // Cursor
    cursorPosition,
    setCursorPosition,

    // Doubt Chat
    chatMessages,
    contextChips,
    tutoringTier,
    setTutoringTier,
    isAnsweringChat,
    handleAskAboutLine,
    handleRemoveContextChip,
    handleSendChatMessage,

    // Command Palette
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
  };
}
