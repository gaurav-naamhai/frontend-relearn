import { useState } from "react";
import { LearnerProfile, Misconception } from "./types";
import { learnerService } from "./services/learnerService";
import { storageService } from "./services/storageService";
import { Sidebar } from "./components/common/Sidebar";
import { TopBar } from "./components/common/TopBar";
import { DemoTourGuide, DEMO_SCENES } from "./components/demo/DemoTourGuide";
import { LearnerComparisonModal } from "./components/demo/LearnerComparisonModal";
import { DelayedRecheckModal } from "./components/reassessment/DelayedRecheckModal";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { AuthPages } from "./pages/AuthPages";
import { OnboardingPage } from "./pages/OnboardingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LearnPage } from "./pages/LearnPage";
import { ReassessmentPage } from "./pages/ReassessmentPage";
import { ProgressPage } from "./pages/ProgressPage";
import { MisconceptionsPage } from "./pages/MisconceptionsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>("/dashboard");
  const [learner, setLearner] = useState<LearnerProfile>(learnerService.getCurrentLearner());
  const [misconceptions, setMisconceptions] = useState<Misconception[]>(
    storageService.getMisconceptions()
  );
  const [historyEvents, setHistoryEvents] = useState(storageService.getHistoryEvents());
  const [problemHistory, setProblemHistory] = useState(storageService.getProblemHistory());

  // Navigation & Modals
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [demoSceneIndex, setDemoSceneIndex] = useState(0);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isDelayedRecheckModalOpen, setIsDelayedRecheckModalOpen] = useState(false);
  const [delayedCheckDue, setDelayedCheckDue] = useState(false);

  // Sync state from storage
  const refreshState = () => {
    setLearner(learnerService.getCurrentLearner());
    setMisconceptions(storageService.getMisconceptions());
    setHistoryEvents(storageService.getHistoryEvents());
    setProblemHistory(storageService.getProblemHistory());
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetData = () => {
    if (window.confirm("Reset demo data to initial state?")) {
      storageService.resetAll();
      refreshState();
      setDelayedCheckDue(false);
      setDemoSceneIndex(0);
      handleNavigate("/dashboard");
    }
  };

  const handleDelayedSuccess = () => {
    learnerService.resolveMisconception("return-vs-print");
    refreshState();
    setDelayedCheckDue(false);
  };

  // Demo Scene Handler (Section 46: 11 Scenes)
  const handleSelectDemoScene = (sceneIndex: number) => {
    setDemoSceneIndex(sceneIndex);
    const scene = DEMO_SCENES[sceneIndex];

    if (scene.step === 1) {
      handleNavigate("/dashboard");
    } else if (scene.step === 2 || scene.step === 3) {
      handleNavigate("/learn");
    } else if (scene.step === 4) {
      handleNavigate("/learn?trace=open");
    } else if (scene.step === 5) {
      handleNavigate("/learn?probe=open");
    } else if (scene.step === 6) {
      handleNavigate("/learn?tab=chat");
    } else if (scene.step === 7) {
      handleNavigate("/reassessment/return-vs-print");
    } else if (scene.step === 8) {
      handleNavigate("/reassessment/return-vs-print?view=style");
    } else if (scene.step === 9) {
      handleNavigate("/reassessment/return-vs-print?view=predict");
    } else if (scene.step === 10) {
      setDelayedCheckDue(true);
      setIsDelayedRecheckModalOpen(true);
      handleNavigate("/dashboard");
    } else if (scene.step === 11) {
      handleNavigate("/dashboard");
    }
  };

  // Standalone pages
  if (currentPath === "/") {
    return (
      <LandingPage
        onStartLearning={() => handleNavigate("/dashboard")}
        onExploreDemo={() => {
          setIsDemoTourOpen(true);
          handleNavigate("/dashboard");
        }}
        onLogin={() => handleNavigate("/login")}
      />
    );
  }

  if (currentPath === "/login") {
    return (
      <AuthPages
        mode="login"
        onSuccess={() => handleNavigate("/dashboard")}
        onSwitchMode={(mode) => handleNavigate(`/${mode}`)}
      />
    );
  }

  if (currentPath === "/signup") {
    return (
      <AuthPages
        mode="signup"
        onSuccess={() => handleNavigate("/onboarding")}
        onSwitchMode={(mode) => handleNavigate(`/${mode}`)}
      />
    );
  }

  if (currentPath === "/onboarding") {
    return (
      <OnboardingPage
        onComplete={() => {
          refreshState();
          handleNavigate("/dashboard");
        }}
      />
    );
  }

  // App Layout with Persistent Sidebar
  return (
    <div className="flex h-screen w-full bg-[#090d13] text-[#e6edf3] overflow-hidden font-sans">
      {/* Persistent Sidebar */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        learner={learner}
        isMobileOpen={isMobileMenuOpen}
        onToggleMobile={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* TopBar */}
        <TopBar
          currentPath={currentPath}
          learner={learner}
          onToggleMobile={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenDemoTour={() => setIsDemoTourOpen(true)}
          onOpenLearnerComparison={() => setIsComparisonModalOpen(true)}
          onResetData={handleResetData}
          onNavigate={handleNavigate}
        />

        {/* View Router */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#090d13]">
          {currentPath === "/dashboard" && (
            <DashboardPage
              learner={learner}
              misconceptions={misconceptions}
              historyEvents={historyEvents}
              onContinueLearning={() => handleNavigate("/learn")}
              onReviewMisconception={(id) => handleNavigate(`/reassessment/${id}`)}
              onTriggerDelayedRecheck={() => setIsDelayedRecheckModalOpen(true)}
              onNavigateToHistory={() => handleNavigate("/history")}
              delayedCheckDue={delayedCheckDue}
            />
          )}

          {currentPath.startsWith("/learn") && (
            <LearnPage
              onStartReassessment={(id) => handleNavigate(`/reassessment/${id}`)}
              onNavigateNextProblem={() => handleNavigate("/dashboard")}
              initialOpenTrace={currentPath.includes("trace=open")}
              initialOpenProbe={currentPath.includes("probe=open")}
            />
          )}

          {currentPath.startsWith("/reassessment") && (
            <ReassessmentPage
              misconceptionId="return-vs-print"
              initialView={
                currentPath.includes("view=style")
                  ? "style"
                  : currentPath.includes("view=predict")
                  ? "predict"
                  : "transfer"
              }
              onComplete={() => {
                refreshState();
                handleNavigate("/dashboard");
              }}
            />
          )}

          {currentPath === "/progress" && <ProgressPage learner={learner} />}

          {currentPath === "/misconceptions" && (
            <MisconceptionsPage
              misconceptions={misconceptions}
              onReviewMisconception={(id) => handleNavigate(`/reassessment/${id}`)}
            />
          )}

          {currentPath === "/history" && (
            <HistoryPage events={historyEvents} problems={problemHistory} />
          )}

          {currentPath === "/profile" && (
            <ProfilePage
              learner={learner}
              onProfileUpdated={(updated) => setLearner(updated)}
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* 3-Minute Demo Tour Guided Navigator (Section 46) */}
      <DemoTourGuide
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        currentSceneIndex={demoSceneIndex}
        onSelectScene={(idx) => {
          handleSelectDemoScene(idx);
          setIsDemoTourOpen(false);
        }}
      />

      {/* Learner A vs B Discrimination Modal (Section 39) */}
      <LearnerComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />

      {/* Delayed Memory Re-Check Modal (Section 24) */}
      <DelayedRecheckModal
        isOpen={isDelayedRecheckModalOpen}
        onClose={() => setIsDelayedRecheckModalOpen(false)}
        onSuccess={handleDelayedSuccess}
        misconceptionName="Return vs Print"
      />
    </div>
  );
}
