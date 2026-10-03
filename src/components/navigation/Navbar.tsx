import React from "react";
import { Code2, LayoutDashboard, User, Settings, Sparkles, Home } from "lucide-react";
import { LearnerProfile } from "../../types";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  learner: LearnerProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  learner,
}) => {
  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Learn", path: "/learn", icon: Code2, badge: "Active" },
    { label: "Profile", path: "/profile", icon: User },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <header className="h-14 border-b border-slate-800 bg-[#090d16]/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Brand */}
      <button
        onClick={() => onNavigate("/dashboard")}
        className="flex items-center gap-2.5 text-left group"
      >
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xs font-mono shadow-sm group-hover:bg-indigo-500 transition-colors">
          RE
        </div>
        <span className="font-extrabold font-mono text-slate-100 text-sm tracking-wider">
          RE:LEARN
        </span>
      </button>

      {/* Main Navigation Tabs */}
      <nav className="flex items-center gap-1 sm:gap-2">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPath === item.path ||
            (item.path === "/learn" && currentPath.startsWith("/learn"));

          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                isActive
                  ? "bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
              {item.badge && isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Level & Profile Pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate("/dashboard")}
          className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono"
        >
          <span className="text-indigo-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Lvl {learner.level}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-bold">{learner.masteryPercentage}%</span>
        </button>

        <button
          onClick={() => onNavigate("/profile")}
          className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-xs font-bold text-indigo-300 hover:scale-105 transition-transform"
          title="Open Profile"
        >
          {learner.name.charAt(0)}
        </button>
      </div>
    </header>
  );
};
