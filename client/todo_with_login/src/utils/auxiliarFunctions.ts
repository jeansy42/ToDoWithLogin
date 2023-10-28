import { LabProInterface, TaskInterface } from "./interfaces";

export const defineTask = (task: TaskInterface): TaskInterface => {
  if (task.description === "") {
    const { description, ...rest } = task;
    return { ...rest };
  } else return task;
};

export const removeDuplicateTasks = (
  tasksToFilter: TaskInterface[],
  tasksToCompare: TaskInterface[]
): TaskInterface[] => {
  if (tasksToCompare.length > 0) {
    const okTasks = tasksToFilter.filter((task) => {
      for (const t of tasksToCompare) {
        if (task.id === t.id) {
          break;
        } else {
          {
            if (tasksToCompare.length - 1 === tasksToCompare.indexOf(t))
              return task;
          }
        }
      }
    });
    return okTasks;
  } else return tasksToFilter;
};

export const addColors = (
  colors: string[],
  list: LabProInterface[]
): LabProInterface[] => {
  let count = -1;
  const labProWithColor = list.map((label) => {
    if (count === colors.length) count = -1;
    count++;
    return { ...label, color: colors[count] };
  });
  return labProWithColor;
};

export const selectLabel = (type: "l" | "p", action: "u" | "a"): string => {
  if (type === "l") {
    if (action === "a") return "New Label";
    else return "Update Label";
  } else {
    if (action === "a") return "New Project";
    else return "Update Project";
  }
};
