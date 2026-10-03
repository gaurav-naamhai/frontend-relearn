import React, { useState } from "react";
import { LearnerProfile } from "./types";
import { learnerService } from "./services/learnerService";
import { storageService } from "./services/storageService";
import { Navbar } from "./components/navigation/Navbar";

// Streamlined Views
import { HeroSection } from "./pages/HeroSection";
import { MainDashboard } from "./pages/MainDashboard";
import { LearningDashboard } from "./pages/LearningDashboard";
import { ProfileSection } from "./pages/ProfileSection";
import { SettingsSection } from "./pages/SettingsSection";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>("/dashboard");
  const [learner, setLearner] = useState<LearnerProfile>(learnerService.getCurrentLearner());

  const refreshState = () => {
    setLearner(learnerService.getCurrentLearner());
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetData = () => {
    if (window.confirm("Reset all local learning progress and restore baseline data?")) {
      storageService.resetAll();
      refreshState();
      handleNavigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground flex flex-col">
      {/* Sleek Top Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        learner={learner}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto">
        {currentPath === "/" && (
          <HeroSection
            onStartLearning={() => handleNavigate("/learn")}
            onGoToDashboard={() => handleNavigate("/dashboard")}
          />
        )}

        {currentPath === "/dashboard" && (
          <MainDashboard
            learner={learner}
            onStartLesson={(_conceptId) => handleNavigate("/learn")}
          />
        )}

        {currentPath === "/learn" && (
          <LearningDashboard
            conceptId="functions"
            onMoveForward={() => {
              // Advance learner mastery upon finishing lesson
              learnerService.resolveMisconception("return-vs-print");
              refreshState();
              handleNavigate("/dashboard");
            }}
          />
        )}

        {currentPath === "/profile" && (
          <ProfileSection learner={learner} />
        )}

        {currentPath === "/settings" && (
          <SettingsSection onResetData={handleResetData} />
        )}
      </main>
    </div>
  );
}
