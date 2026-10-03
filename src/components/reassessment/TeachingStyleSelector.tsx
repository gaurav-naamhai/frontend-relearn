import React from "react";
import { TeachingStyle } from "../../types";
import { Eye, GitCompare, ListOrdered, Sparkles } from "lucide-react";
import { reassessmentService } from "../../services/reassessmentService";

interface TeachingStyleSelectorProps {
  selectedStyle: TeachingStyle;
  onSelectStyle: (style: TeachingStyle) => void;
  preferredStyle?: string;
}

export const TeachingStyleSelector: React.FC<TeachingStyleSelectorProps> = ({
  selectedStyle,
  onSelectStyle,
  preferredStyle = "Contrast examples",
}) => {
  const styles: { id: TeachingStyle; label: string; desc: string; icon: any; isStrongest?: boolean }[] = [
    {
      id: "contrast-examples",
      label: "Compare Two Examples",
      desc: "Side-by-side contrast between flawed and sound Python code patterns.",
      icon: GitCompare,
      isStrongest: true,
    },
    {
      id: "visual-trace",
      label: "Visual Memory Trace",
      desc: "Step-by-step memory frame diagram showing where return values travel.",
      icon: Eye,
    },
    {
      id: "step-by-step",
      label: "Step-by-Step Walkthrough",
      desc: "Systematic conceptual rules and mental checklists for writing functions.",
      icon: ListOrdered,
    },
  ];

  const content = reassessmentService.getTeachingStyleContent(selectedStyle);

  return (
    <div className="space-y-4 p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Adaptive Teaching Style Switch
          </h4>
          <p className="text-slate-400 text-xs mt-0.5">
            Different brains learn best through different representations. Select the one that clicks for you.
          </p>
        </div>

        <div className="px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 font-mono text-[11px] self-start sm:self-auto">
          Learner Model: <span className="font-bold">{preferredStyle}</span>
        </div>
      </div>

      {/* Style Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {styles.map((s) => {
          const Icon = s.icon;
          const isSelected = selectedStyle === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectStyle(s.id)}
              className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 transition-all ${
                isSelected
                  ? "bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-950/50"
                  : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-indigo-400" : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      isSelected ? "text-slate-100" : "text-slate-300"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {s.isStrongest && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
                    Strongest
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Render Selected Teaching Content (Section 22) */}
      <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-200 text-xs font-mono">
            {content.title}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
            {content.badge}
          </span>
        </div>
        <p className="text-slate-400 text-xs">{content.description}</p>

        {selectedStyle === "contrast-examples" && content.exampleA && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="text-rose-400 font-bold font-mono text-[11px] block">
                {content.exampleA.title}
              </span>
              <pre className="font-mono text-[11px] text-slate-300 whitespace-pre-wrap bg-black/70 p-2 rounded border border-rose-950">
                {content.exampleA.code}
              </pre>
              <p className="text-[11px] text-rose-300/80">{content.exampleA.note}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <span className="text-emerald-400 font-bold font-mono text-[11px] block">
                {content.exampleB.title}
              </span>
              <pre className="font-mono text-[11px] text-slate-300 whitespace-pre-wrap bg-black/70 p-2 rounded border border-emerald-950">
                {content.exampleB.code}
              </pre>
              <p className="text-[11px] text-emerald-300/80">{content.exampleB.note}</p>
            </div>
          </div>
        )}

        {(selectedStyle === "visual-trace" || selectedStyle === "step-by-step") && content.steps && (
          <div className="space-y-2 pt-1 font-mono text-xs">
            {content.steps.map((st, i) => (
              <div
                key={i}
                className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-slate-300 flex items-start gap-2"
              >
                <span className="text-indigo-400 font-bold">#{i + 1}</span>
                <span className="font-sans text-xs">{st}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
