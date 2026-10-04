import React from "react";
import { Workbench } from "../components/workbench/Workbench";
import { learnerService } from "../services/learnerService";

interface LearningDashboardProps {
  conceptId?: string;
  onMoveForward?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  conceptId = "functions",
  onMoveForward,
  onNavigate = (path: string) => {
    window.location.hash = path;
  },
  currentPath = "/learn",
}) => {
  const currentLearner = learnerService.getCurrentLearner();

  return (
    <Workbench
      currentPath={currentPath}
      onNavigate={onNavigate}
      learner={currentLearner}
      conceptId={conceptId}
      onAdvanceLesson={onMoveForward}
    />
  );
};
