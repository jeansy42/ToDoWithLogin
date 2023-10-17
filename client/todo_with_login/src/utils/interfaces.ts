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
