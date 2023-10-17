import { TaskInterface } from "./interfaces";

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
