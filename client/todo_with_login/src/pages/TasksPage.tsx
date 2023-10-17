"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/utils/useAuthContext";
import { AuthContextInterface, TaskInterface } from "@/utils/interfaces";
import TasksByDueDate from "@/components/TasksByDueDate";
import TasksByPriority from "@/components/TasksByPriority";

function TasksPage() {
  const { sortBy } = useAuthContext() as AuthContextInterface;
  if (sortBy === "due_date") return <TasksByDueDate />;
  else if (sortBy === "priority") return <TasksByPriority />;
}

export default TasksPage;
