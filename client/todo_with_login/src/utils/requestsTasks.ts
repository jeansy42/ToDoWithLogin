import axios from "./axios";
import { TaskInterface } from "./interfaces";

/**Get tasks by due date */

export const getTodayTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?date=today");
  return res.data;
};
export const getTomorrowTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?date=tomorrow");
  return res.data;
};
export const getWeekTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?date=week&order=due_dateA");
  return res.data;
};
export const getMonthTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?date=month&order=due_dateA");
  return res.data;
};
export const getYearTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?date=year&order=due_dateA");
  return res.data;
};
export const getTasksBeyondThisYear = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?date=beyond_this_year&order=due_dateA");
  return res.data;
};

/**Get tasks by priority */

export const getLowPriorityTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?priority=low&order=due_dateA");
  return res.data;
};
export const getMediumPriorityTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?priority=medium&order=due_dateA");
  return res.data;
};
export const getHighPriorityTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?priority=high&order=due_dateA");
  return res.data;
};

/**Get tasks by status */
export const getCompletedTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?status=completed&order=due_dateA");
  return res.data;
};
export const getPendingTasks = async (): Promise<TaskInterface[]> => {
  const res = await axios.get("/tasks?status=pending&order=due_dateA");
  return res.data;
};

/**Set status task */
export const setStatusTask = async (id: number, csrf: string) => {
  const res = await axios.put(`/tasks/set_status/${id}`, null, {
    headers: { "X-CSRF-TOKEN": csrf },
  });
  return res;
};
