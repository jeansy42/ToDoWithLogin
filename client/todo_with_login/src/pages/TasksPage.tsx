"use client";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthContextInterface } from "@/utils/interfaces";
import TasksByDueDate from "@/components/TasksByDueDate";
import TasksByPriority from "@/components/TasksByPriority";
import TasksByLabel from "@/components/TasksByLabel";
import TasksByProject from "@/components/TasksByProjects";

function TasksPage() {
  const { sortBy } = useAuthContext() as AuthContextInterface;
  if (sortBy === "due_date") return <TasksByDueDate />;
  else if (sortBy === "priority") return <TasksByPriority />;
  else if (sortBy === "label") return <TasksByLabel />;
  else if (sortBy === "project") return <TasksByProject />;
}

export default TasksPage;
