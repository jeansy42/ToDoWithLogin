"use client";
import axios from "axios";
import { AuthContextInterface, TaskInterface } from "@/utils/interfaces";
import { setStatusTask } from "@/utils/requestsTasks";
import { useAuthContext } from "@/utils/useAuthContext";
import { Checkbox, Spinner } from "@material-tailwind/react";
import { useState } from "react";
function TaskCard({ task }: { task: TaskInterface }) {
  const { csrfToken, setIsAuthenticated } =
    useAuthContext() as AuthContextInterface;
  const [isCompleted, setIsCompleted] = useState(task.status === "completed");
  const [isLoading, setIsLoading] = useState(false);

  /**Duedate Task */
  const currentYear = new Date().getUTCFullYear();
  const date = new Date(task.due_date);
  const weekDay = date.toLocaleString("en", { weekday: "short" });
  const monthDay = date.getUTCDate();
  const month = date.toLocaleString("en", { month: "short" });
  const year = date.getUTCFullYear();
  const formatedDate = `${weekDay}, ${monthDay} ${month} ${
    year > currentYear ? year : ""
  }`;

  /**Seting status ok task */
  const handleChange = async () => {
    try {
      setIsLoading(true);
      const res = await setStatusTask(task.id as number, csrfToken as string);
      setIsCompleted(!isCompleted);
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 422)
          setIsAuthenticated(false);
        else console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex justify-between px-2 mt-4 rounded-lg shadow-cusShadowBox ${
        isCompleted ? "blur-[1.5px]" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        {!isLoading ? (
          <Checkbox
            className="h-4 w-4 rounded-full border-2 border-cusDarkViolet"
            onChange={handleChange}
            checked={isCompleted}
            crossOrigin={"true"}
          />
        ) : (
          <div className="inline-flex items-center w-10 h-10 px-3 py-2">
            <Spinner className="h-4 w-4 " color="indigo" />
          </div>
        )}
        <div>
          <p className="text-sm text-cusDarkGray first-letter:uppercase">
            {task.title}
          </p>
          <p className="text-[0.70rem] text-blue-gray-300">{formatedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
