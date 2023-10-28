"use client";
import { Spinner, Collapse } from "@material-tailwind/react";
import DashBoardNavegation from "@/components/Dashboard/DashBoardNavegation";
import DashboardSection from "@/components/Dashboard/DashboardSection";
import { useLabelsLoader, useProjectsLoader } from "@/hooks/useLabProLoader";
import ProjectSection from "@/components/Dashboard/ProjectSection";
import LabelSection from "@/components/Dashboard/LabelSection";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  AuthContextInterface,
  DashboardContextInterface,
} from "@/utils/interfaces";
import NewLabelform from "@/components/Dashboard/NewLabelform";
import StatusSection from "@/components/Dashboard/StatusSection";
import { useTasksByStatusLoader } from "@/hooks/useTasksLoader";
import { useDashboardContext } from "@/hooks/useDashboardContext";

function Dashboard() {
  const {
    showProjects,
    setShowProjects,
    showLabels,
    setShowLabels,
    showStatus,
    setShowStatus,
  } = useAuthContext() as AuthContextInterface;

  const {
    addOrUpdLabel,
    addOrUpdProject,
    setAddOrUpdLabel,
    setAddOrUpdProject,
  } = useDashboardContext() as DashboardContextInterface;

  const isLoadingLabels = useLabelsLoader();
  const isLoadingProjects = useProjectsLoader();

  const isLoadingCountTasksByStatus = useTasksByStatusLoader();

  return (
    <div className="flex flex-col gap-6 px-3">
      <DashBoardNavegation />

      {/**Projects */}
      <div>
        <DashboardSection
          isForm={addOrUpdProject.state}
          setIsform={setAddOrUpdProject}
          text="Projects"
          state={showProjects}
          action={setShowProjects}
        />
        {/**Form Project */}

        <Collapse className="pt-2" open={addOrUpdProject.state}>
          <NewLabelform type="p" open={addOrUpdProject.state} />
        </Collapse>

        {showProjects && isLoadingLabels ? (
          <Spinner color="cyan" />
        ) : (
          <ProjectSection isShow={showProjects} />
        )}
      </div>

      {/**Labels */}
      <div>
        <DashboardSection
          isForm={addOrUpdLabel.state}
          setIsform={setAddOrUpdLabel}
          text="Labels"
          state={showLabels}
          action={setShowLabels}
        />
        {/**Form Label */}
        <Collapse className="pt-2" open={addOrUpdLabel.state}>
          <NewLabelform type="l" open={addOrUpdLabel.state} />
        </Collapse>

        {showLabels && isLoadingProjects ? (
          <Spinner color="green" />
        ) : (
          <LabelSection isShow={showLabels} />
        )}
      </div>

      {/**Status */}
      <div>
        <DashboardSection
          isForm={undefined}
          setIsform={undefined}
          text="Status"
          state={showStatus}
          action={setShowStatus}
        />
        <StatusSection
          isLoad={isLoadingCountTasksByStatus}
          isShow={showStatus}
        />
      </div>
    </div>
  );
}

export default Dashboard;
