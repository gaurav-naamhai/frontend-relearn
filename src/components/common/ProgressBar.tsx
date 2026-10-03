import React from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: "emerald" | "indigo" | "amber" | "rose" | "purple";
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "indigo",
  height = "md",
  showLabel = false,
  className = "",
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3.5",
  }[height];

  const colorClasses = {
    emerald: "bg-emerald-500",
    indigo: "bg-indigo-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    purple: "bg-purple-500",
  }[color];

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 text-slate-400 font-mono">
          <span>Progress</span>
          <span className="text-slate-200 font-semibold">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-900/90 rounded-full overflow-hidden border border-slate-800 ${heightClasses}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorClasses}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
