import { AuthContextInterface } from "@/utils/interfaces";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import { getCompletedTasks, getPendingTasks } from "@/utils/requestsTasks";
import axios from "axios";

export const useTasksByStatusLoader = () => {
  const { setCompletedTasks, setPendingTasks, setIsAuthenticated } =
    useAuthContext() as AuthContextInterface;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const [completedTasks, pendingTasks] = await Promise.all([
          getCompletedTasks(),
          getPendingTasks(),
        ]);
        setCompletedTasks(completedTasks);
        setPendingTasks(pendingTasks);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 || error.response?.status === 422)
            setIsAuthenticated(false);
          else console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);
  return isLoading;
};
