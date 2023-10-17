"use client";
import { useEffect, useState } from "react";
import { TaskInterface } from "@/utils/interfaces";
import {
  getMonthTasks,
  getTasksBeyondThisYear,
  getTodayTasks,
  getTomorrowTasks,
  getWeekTasks,
  getYearTasks,
} from "@/utils/requestsTasks";
import SpinnerLoading from "@/components/SpinnerLoading";
import { removeDuplicateTasks } from "@/utils/auxiliarFunctions";
import TaskSection from "@/components/TaskSection";
function TasksByDueDate() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasksToday, setTasksToday] = useState<TaskInterface[]>([]);
  const [tasksTomorrow, setTasksTomorrow] = useState<TaskInterface[]>([]);
  const [tasksWeek, setTasksWeek] = useState<TaskInterface[]>([]);
  const [tasksMonth, setTasksMonth] = useState<TaskInterface[]>([]);
  const [tasksYear, setTasksYear] = useState<TaskInterface[]>([]);
  const [tasksBeyondThisYear, setTasksBeyondThisYear] = useState<
    TaskInterface[]
  >([]);
  useEffect(() => {
    const getTasksByDueDate = async () => {
      try {
        const [
          todayTasks,
          tomorrowTasks,
          weekTasks,
          monthTasks,
          yearTasks,
          otherTasks,
        ] = await Promise.all([
          getTodayTasks(),
          getTomorrowTasks(),
          getWeekTasks(),
          getMonthTasks(),
          getYearTasks(),
          getTasksBeyondThisYear(),
        ]);
        const okWeekTasks = removeDuplicateTasks(weekTasks, [
          ...todayTasks,
          ...tomorrowTasks,
        ]);
        const okMonthTasks = removeDuplicateTasks(monthTasks, [
          ...todayTasks,
          ...tomorrowTasks,
          ...okWeekTasks,
        ]);
        const okYearTasks = removeDuplicateTasks(yearTasks, [
          ...todayTasks,
          ...tomorrowTasks,
          ...okWeekTasks,
          ...okMonthTasks,
        ]);
  
        setTasksToday(todayTasks);
        setTasksTomorrow(tomorrowTasks);
        setTasksWeek(okWeekTasks);
        setTasksMonth(okMonthTasks);
        setTasksYear(okYearTasks);
        setTasksBeyondThisYear(otherTasks);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTasksByDueDate();
  }, []);
  if (isLoading) return <SpinnerLoading size={12} />;
  else
    return (
      <div className="flex flex-col gap-4 px-3">
        <TaskSection tasks={tasksToday} text="Today" />
        <TaskSection tasks={tasksTomorrow} text="Tomorrow" />
        <TaskSection tasks={tasksWeek} text="This Week" />
        <TaskSection tasks={tasksMonth} text="This Month" />
        <TaskSection tasks={tasksYear} text="This Year" />
        <TaskSection tasks={tasksBeyondThisYear} text="Beyond This Year" />
      </div>
    );
}

export default TasksByDueDate;
