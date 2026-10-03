import React from "react";
import { ErrorClassification, MisconceptionStatus } from "../../types";

interface BadgeProps {
  type?: ErrorClassification | MisconceptionStatus | "difficulty" | "custom";
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "purple";
  label: string;
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  type,
  variant,
  label,
  size = "md",
  className = "",
}) => {
  let style = "bg-slate-800 text-slate-300 border-slate-700";

  if (variant) {
    switch (variant) {
      case "success":
        style = "bg-emerald-950/60 text-emerald-300 border-emerald-800/80";
        break;
      case "warning":
        style = "bg-amber-950/60 text-amber-300 border-amber-800/80";
        break;
      case "error":
        style = "bg-rose-950/60 text-rose-300 border-rose-800/80";
        break;
      case "purple":
        style = "bg-indigo-950/60 text-indigo-300 border-indigo-700/80";
        break;
      case "info":
        style = "bg-cyan-950/60 text-cyan-300 border-cyan-800/80";
        break;
      case "neutral":
        style = "bg-slate-800/80 text-slate-300 border-slate-700";
        break;
    }
  } else if (type) {
    switch (type) {
      case "active":
        style = "bg-amber-950/70 text-amber-300 border-amber-700/80 animate-pulse";
        break;
      case "recurring":
        style = "bg-rose-950/80 text-rose-300 border-rose-700 font-semibold";
        break;
      case "resolved":
        style = "bg-emerald-950/80 text-emerald-300 border-emerald-700";
        break;
      case "provisional":
        style = "bg-indigo-950/70 text-indigo-300 border-indigo-700";
        break;
      case "never-seen":
        style = "bg-slate-800/60 text-slate-400 border-slate-700/50";
        break;
      case "conceptual":
        style = "bg-amber-950/70 text-amber-300 border-amber-700";
        break;
      case "careless-slip":
        style = "bg-blue-950/70 text-blue-300 border-blue-700";
        break;
      case "logical":
        style = "bg-purple-950/70 text-purple-300 border-purple-700";
        break;
      case "syntax":
        style = "bg-rose-950/70 text-rose-300 border-rose-700";
        break;
      case "runtime":
        style = "bg-red-950/70 text-red-300 border-red-700";
        break;
    }
  }

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-medium tracking-wide ${sizeClasses} ${style} ${className}`}
    >
      {label}
    </span>
  );
};
