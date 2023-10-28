"use client";
import {
  AuthContextInterface,
  LabProInterface,
  NewUserInterface,
  TaskInterface,
} from "@/utils/interfaces";
import { ReactNode, createContext, useRef, useState } from "react";
export const context = createContext<AuthContextInterface | undefined>(
  undefined
);

function AuthContext({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<NewUserInterface | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | undefined>("");
  const [sortBy, setSortBy] = useState("due_date");
  const [showTasksOptions, setShowTasksOptions] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [hideOverdueTasks, setHideOverdueTasks] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [labels, setLabels] = useState<LabProInterface[]>([]);
  const [projects, setProjects] = useState<LabProInterface[]>([]);
  const [isScroll, setIsScroll] = useState(false);
  const [activeToScroll, setActiveToScroll] = useState("");
  const elementToScroll = useRef(null);

  {
    /**Dashboard states */
  }
  const [showProjects, setShowProjects] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  {
    /**Tasks */
  }
  const [completedTasks, setCompletedTasks] = useState<TaskInterface[]>([]);
  const [pendingTasks, setPendingTasks] = useState<TaskInterface[]>([]);
  {
    /**Update labels and projects */
  }

  return (
    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        csrfToken,
        setCsrfToken,
        user,
        setUser,
        sortBy,
        setSortBy,
        showTasksOptions,
        setShowTasksOptions,
        showLabel,
        setShowLabel,
        showCompleted,
        setShowCompleted,
        hideOverdueTasks,
        setHideOverdueTasks,
        showSortOptions,
        setShowSortOptions,
        labels,
        setLabels,
        projects,
        setProjects,
        elementToScroll,
        isScroll,
        setIsScroll,
        activeToScroll,
        setActiveToScroll,
        showProjects,
        setShowProjects,
        showLabels,
        setShowLabels,
        showStatus,
        setShowStatus,
        completedTasks,
        setCompletedTasks,
        pendingTasks,
        setPendingTasks,
      }}
    >
      {children}
    </context.Provider>
  );
}

export default AuthContext;
