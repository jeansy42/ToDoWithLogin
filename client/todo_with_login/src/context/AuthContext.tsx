"use client";
import { AuthContextInterface, NewUserInterface } from "@/utils/interfaces";
import { ReactNode, createContext, useState } from "react";
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
      }}
    >
      {children}
    </context.Provider>
  );
}

export default AuthContext;
