import React from "react";
import {
  LayoutDashboard,
  Code2,
  TrendingUp,
  BrainCircuit,
  History,
  User,
  Settings,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { LearnerProfile } from "../../types";

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  learner: LearnerProfile;
  isMobileOpen: boolean;
  onToggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  learner,
  isMobileOpen,
  onToggleMobile,
}) => {
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Learn", path: "/learn", icon: Code2, badge: "Targeted" },
    { label: "Progress", path: "/progress", icon: TrendingUp },
    {
      label: "Misconceptions",
      path: "/misconceptions",
      icon: BrainCircuit,
      badgeCount: learner.activeMisconceptionsCount,
    },
    { label: "History", path: "/history", icon: History },
  ];

  const secondaryNavItems = [
    { label: "Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/profile", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0d131f] border-r border-slate-800/80 text-slate-300 w-64 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            RE
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-slate-100 text-base font-mono flex items-center gap-1.5">
              RE:LEARN
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                v1
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Cognitive Python Learning</div>
          </div>
        </button>

        {isMobileOpen && (
          <button
            onClick={onToggleMobile}
            className="md:hidden text-slate-400 hover:text-slate-100 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Learning Loop
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPath === item.path ||
            (item.path === "/learn" && currentPath.startsWith("/learn"));

          return (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                if (isMobileOpen) onToggleMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-300"
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-mono">
                  {item.badge}
                </span>
              )}

              {typeof item.badgeCount === "number" && item.badgeCount > 0 && (
                <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}

        {/* Current Goal Section */}
        <div className="pt-5 pb-2">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            Current Goal
          </div>
          <div className="mx-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <div className="font-semibold text-slate-200">{learner.goal}</div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
              <span>Python Fundamentals</span>
              <span className="text-emerald-400 font-mono">On Track</span>
            </div>
          </div>
        </div>

        {/* Secondary Links */}
        <div className="pt-4 pb-2">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Account
          </div>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.path);
                  if (isMobileOpen) onToggleMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Learner Mastery Level Card (Section 3 & 31) */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/70">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-bold text-indigo-300 font-mono flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            LEVEL {learner.level}
          </span>
          <span className="text-slate-400 text-[11px] font-mono">
            {learner.masteryPercentage}% Mastery
          </span>
        </div>

        {/* Mastery bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 mb-2">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${learner.masteryPercentage}%` }}
          />
        </div>

        <div className="text-[10px] text-slate-400 leading-tight">
          Level advances via conceptual mastery, not brute-force problem count.
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onToggleMobile}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
