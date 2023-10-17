"use client";

import { AuthContextInterface } from "@/utils/interfaces";
import { useAuthContext } from "@/utils/useAuthContext";
import ModalTasksOptions from "./ModalTasksOptions";
import SortedByOptions from "./SortedByOptions";

function TasksOptions() {
  const { setShowTasksOptions, showSortOptions } =
    useAuthContext() as AuthContextInterface;
  const handleClick = () => {
    if (!showSortOptions) setShowTasksOptions(false);
  };

  return (
    <div
      className="fixed top-0 flex justify-end w-screen h-screen z-20 px-6 pt-[2.1rem]"
      onClick={handleClick}
    >
      {!showSortOptions ? <ModalTasksOptions /> : <SortedByOptions />}
    </div>
  );
}

export default TasksOptions;
