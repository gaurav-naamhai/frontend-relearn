import React, { useRef, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Play, RotateCcw, Sparkles, FileCode } from "lucide-react";

interface CodeEditorWrapperProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  onLoadDemoCode?: () => void;
  isRunning: boolean;
  highlightedLines?: number[]; // e.g. [2]
}

export const CodeEditorWrapper: React.FC<CodeEditorWrapperProps> = ({
  code,
  onChange,
  onRun,
  onReset,
  onLoadDemoCode,
  isRunning,
  highlightedLines = [],
}) => {
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define keyboard shortcut Ctrl+Enter or Cmd+Enter to run code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });
  };

  // Update line highlights when highlightedLines prop changes
  useEffect(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current;

    if (highlightedLines.length > 0) {
      const newDecorations = highlightedLines.map((line) => ({
        range: {
          startLineNumber: line,
          startColumn: 1,
          endLineNumber: line,
          endColumn: 100,
        },
        options: {
          isWholeLine: true,
          className: "bg-amber-950/40 border-l-4 border-amber-500",
          glyphMarginClassName: "text-amber-400 font-bold",
          hoverMessage: {
            value: "**Conceptual Misconception Detected on Line " + line + "**\n\nTreating print() as if it delivers a return value.",
          },
        },
      }));
      decorationsRef.current = editor.deltaDecorations(
        decorationsRef.current,
        newDecorations
      );
    } else {
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
    }
  }, [highlightedLines]);

  return (
    <div className="flex flex-col h-full bg-[#0d1117] border-t lg:border-t-0 lg:border-l border-slate-800 relative">
      {/* Editor Control Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#090d16] border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-slate-300 font-semibold">solution.py</span>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            (Python 3.11 Runtime)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onLoadDemoCode && (
            <button
              onClick={onLoadDemoCode}
              className="px-2 py-1 rounded text-[11px] font-mono text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 transition-colors flex items-center gap-1"
              title="Pre-seed demo code with Return vs Print mistake"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Load Demo Code</span>
            </button>
          )}

          <button
            onClick={onReset}
            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Reset code to starter template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 min-h-[300px] relative">
        <Editor
          height="100%"
          defaultLanguage="python"
          language="python"
          value={code}
          onChange={(val) => onChange(val || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "all",
            lineDecorationsWidth: 10,
            glyphMargin: true,
            tabSize: 4,
            insertSpaces: true,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            bracketPairColorization: { enabled: true },
            overviewRulerBorder: false,
          }}
        />

        {/* Floating Line 2 Error Marker Tag if line 2 is highlighted */}
        {highlightedLines.includes(2) && (
          <div className="absolute top-[40px] right-4 z-10 animate-in fade-in slide-in-from-right-2 duration-300 pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/90 text-amber-300 border border-amber-600/80 shadow-lg shadow-black/80 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Line 2: Conceptual Misconception</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Run Action Bar */}
      <div className="p-3 bg-[#090d16] border-t border-slate-800 flex items-center justify-between">
        <div className="text-[11px] text-slate-400 font-mono hidden sm:flex items-center gap-2">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Ctrl+Enter
          </kbd>
          <span>to run</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 shadow-lg transition-all ${
              isRunning
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span>Running Tests...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
