"use client";
import { AuthContextInterface } from "@/utils/interfaces";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useProjectsLoader } from "@/hooks/useLabProLoader";
import TaskSection from "./TaskSection";
import SpinnerLoading from "./SpinnerLoading";
import { useScroll } from "@/hooks/useScroll";

function TasksByProject() {
  const { projects } = useAuthContext() as AuthContextInterface;
  const isLoading = useProjectsLoader();
  useScroll();
  if (isLoading) return <SpinnerLoading size={12} />;
  return (
    <div className="flex flex-col gap-4 px-3">
      {projects.map((project) => (
        <TaskSection
          tasks={project.tasks}
          text={project.title}
          key={window.crypto.randomUUID()}
        />
      ))}
    </div>
  );
}

export default TasksByProject;
