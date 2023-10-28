"use client";
import { AuthContextInterface } from "@/utils/interfaces";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLabelsLoader } from "@/hooks/useLabProLoader";
import TaskSection from "./TaskSection";
import SpinnerLoading from "./SpinnerLoading";
import { useScroll } from "@/hooks/useScroll";

function TasksByLabel() {
  const { labels } = useAuthContext() as AuthContextInterface;
  const isLoading = useLabelsLoader();
  useScroll();
  if (isLoading) return <SpinnerLoading size={12} />;
  return (
    <div className="flex flex-col gap-4 px-3">
      {labels.map((label) => (
        <TaskSection
          tasks={label.tasks}
          text={label.title}
          key={window.crypto.randomUUID()}
        />
      ))}
    </div>
  );
}

export default TasksByLabel;
