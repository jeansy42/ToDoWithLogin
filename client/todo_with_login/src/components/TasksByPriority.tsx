"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getHighPriorityTasks,
  getLowPriorityTasks,
  getMediumPriorityTasks,
} from "@/utils/requestsTasks";
import { TaskInterface } from "@/utils/interfaces";
import SpinnerLoading from "./SpinnerLoading";
import { redirect } from "next/navigation";
import TaskSection from "./TaskSection";

function TasksByPriority() {
  const [isLoading, setIsLoading] = useState(true);
  const [lowPTasks, setLowPTasks] = useState<TaskInterface[]>([]);
  const [mediumPTasks, setMediumPTasks] = useState<TaskInterface[]>([]);
  const [highPTasks, setHighPTasks] = useState<TaskInterface[]>([]);
  useEffect(() => {
    const getTasksByPriority = async () => {
      try {
        const [lowPriorityTasks, mediumPriorityTasks, highPriorityTasks] =
          await Promise.all([
            getLowPriorityTasks(),
            getMediumPriorityTasks(),
            getHighPriorityTasks(),
          ]);

        setLowPTasks(lowPriorityTasks);
        setMediumPTasks(mediumPriorityTasks);
        setHighPTasks(highPriorityTasks);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status === 422 || error.status === 401) redirect("/login");
        } else console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTasksByPriority();
  }, []);

  if (isLoading) return <SpinnerLoading size={12} />;
  else
    return (
      <div className="flex flex-col gap-4 px-3">
        <TaskSection tasks={highPTasks} text="High Priority" />
        <TaskSection tasks={mediumPTasks} text="Medium Priority" />
        <TaskSection tasks={lowPTasks} text="Low Priority" />
      </div>
    );
}

export default TasksByPriority;
