import React, { useState } from "react";
import { Sliders, Code2, RotateCcw, Check } from "lucide-react";

interface SettingsSectionProps {
  onResetData: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ onResetData }) => {
  const [fontSize, setFontSize] = useState("14px");
  const [tabSize, setTabSize] = useState("4 spaces");
  const [liveCompile, setLiveCompile] = useState(true);
  const [lineInsights, setLineInsights] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const triggerSaveNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Preferences & Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure your code editor environment, compiler behavior, and data options.
          </p>
        </div>

        {savedNotice && (
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-lg flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-3.5 h-3.5" /> Saved
          </span>
        )}
      </div>

      {/* Editor Preferences */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-400" />
          Code Editor Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Font Size */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-mono">Editor Font Size</label>
            <div className="flex items-center gap-2">
              {["13px", "14px", "16px"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => {
                    setFontSize(sz);
                    triggerSaveNotice();
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-mono transition-colors ${
                    fontSize === sz
                      ? "bg-indigo-600 text-white border-indigo-500 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Size */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-mono">Tab Indentation</label>
            <div className="flex items-center gap-2">
              {["4 spaces", "2 spaces"].map((ts) => (
                <button
                  key={ts}
                  onClick={() => {
                    setTabSize(ts);
                    triggerSaveNotice();
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-mono transition-colors ${
                    tabSize === ts
                      ? "bg-indigo-600 text-white border-indigo-500 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {ts}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compiler Behavior */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          Compiler & Learning Behavior
        </h2>

        <div className="space-y-3 text-xs">
          {/* Live Auto-Compile */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="font-semibold text-slate-200">Auto-Compile As You Type</div>
              <div className="text-slate-500 text-[11px]">
                Debounces code changes and compiles in the background without requiring manual clicks.
              </div>
            </div>
            <button
              onClick={() => {
                setLiveCompile(!liveCompile);
                triggerSaveNotice();
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-colors ${
                liveCompile
                  ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {liveCompile ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* Line-by-Line Insights */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="font-semibold text-slate-200">Line-by-Line Error Insights</div>
              <div className="text-slate-500 text-[11px]">
                Pinpoint exact faulty line numbers and display targeted cognitive explanations.
              </div>
            </div>
            <button
              onClick={() => {
                setLineInsights(!lineInsights);
                triggerSaveNotice();
              }}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-colors ${
                lineInsights
                  ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {lineInsights ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-rose-300">Reset Local Progress</h3>
            <p className="text-slate-400 text-xs">
              Clear local cached solutions, concept history, and reset to baseline demonstration state.
            </p>
          </div>

          <button
            onClick={onResetData}
            className="px-4 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800/80 border border-rose-700 text-rose-200 font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
