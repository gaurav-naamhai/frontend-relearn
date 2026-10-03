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
    <header className="h-14 border-b border-border bg-card/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Brand */}
      <button
        onClick={() => onNavigate("/dashboard")}
        className="flex items-center gap-2.5 text-left group"
      >
        <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-xs font-mono shadow-sm group-hover:opacity-90 transition-opacity">
          RE
        </div>
        <span className="font-extrabold font-mono text-foreground text-sm tracking-wider">
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
                  ? "bg-accent text-accent-foreground font-semibold border border-border shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
          className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-muted/60 border border-border text-xs font-mono"
        >
          <span className="text-foreground font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-chart-1" />
            Lvl {learner.level}
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-foreground font-bold">{learner.masteryPercentage}%</span>
        </button>

        <button
          onClick={() => onNavigate("/profile")}
          className="w-7 h-7 rounded-full bg-accent border border-border flex items-center justify-center text-xs font-bold text-foreground hover:bg-muted transition-colors"
          title="Open Profile"
        >
          {learner.name.charAt(0)}
        </button>
      </div>
    </header>
  );
};
