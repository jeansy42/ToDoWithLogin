import React from "react";

export interface AuthContextInterface {
  isAuthenticated: boolean;
  csrfToken: string | undefined;
  user: NewUserInterface | null;
  sortBy: string;
  showTasksOptions: boolean;
  showLabel: boolean;
  showCompleted: boolean;
  hideOverdueTasks: boolean;
  showSortOptions: boolean;
  labels: LabProInterface[];
  projects: LabProInterface[];
  elementToScroll: React.MutableRefObject<HTMLDivElement | null>;
  isScroll: boolean;
  activeToScroll: string;
  showProjects: boolean;
  showLabels: boolean;
  showStatus: boolean;

  completedTasks: TaskInterface[];
  pendingTasks: TaskInterface[];

  setPendingTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;

  setShowProjects: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLabels: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveToScroll: React.Dispatch<React.SetStateAction<string>>;
  setIsScroll: React.Dispatch<React.SetStateAction<boolean>>;
  setLabels: React.Dispatch<React.SetStateAction<LabProInterface[]>>;
  setProjects: React.Dispatch<React.SetStateAction<LabProInterface[]>>;
  setShowLabel: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setHideOverdueTasks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSortOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTasksOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<NewUserInterface | null>>;
  setCsrfToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DashboardContextInterface {
  addOrUpdLabel: AddOrUpdLabPro;
  addOrUpdProject: AddOrUpdLabPro;
  refreshLabels: number;
  refreshProjects: number;
  setAddOrUpdProject: React.Dispatch<React.SetStateAction<AddOrUpdLabPro>>;
  setAddOrUpdLabel: React.Dispatch<React.SetStateAction<AddOrUpdLabPro>>;
  setRefreshLabels: React.Dispatch<React.SetStateAction<number>>;
  setRefreshProjects: React.Dispatch<React.SetStateAction<number>>;
  labelToUpdate: LabProToUpdateInterface;
  setLabelToUpdate: React.Dispatch<
    React.SetStateAction<LabProToUpdateInterface>
  >;
  projectToUpdate: LabProToUpdateInterface;
  setProjectToUpdate: React.Dispatch<
    React.SetStateAction<LabProToUpdateInterface>
  >;
}

export interface CredentialsInterface {
  email: string;
  password: string;
}
export interface NewUserInterface {
  fullname: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  repeatPassword?: string;
}
export interface TaskInterface {
  id?: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  due_date: string;
}
export interface TaskFormInterface {
  title: string;
  description: string;
  priority: { label: string; value: string } | null;
  due_date: string;
}

export interface LabProInterface {
  id: number;
  title: string;
  color?: string;
  tasks: TaskInterface[];
}

export interface LabProToUpdateInterface {
  id: number;
  title: string;
}

export interface AddOrUpdLabPro {
  state: boolean;
  action: "a" | "u";
}
