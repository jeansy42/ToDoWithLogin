"use client";
import {
  ArrowsUpDownIcon,
  CheckCircleIcon,
  EllipsisHorizontalIcon,
  EyeSlashIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import OptionCard from "./subcomponents/OptionCard";
import { useAuthContext } from "@/utils/useAuthContext";
import { AuthContextInterface } from "@/utils/interfaces";

function ModalTasksOptions() {
  const handleChangeShowLabel = () => setShowLabel(!showLabel);
  const handleChangeShowCompleted = () => setShowCompleted(!showCompleted);
  const handleChangeHideOverdueTasks = () =>
    setHideOverdueTasks(!hideOverdueTasks);

  const {
    showLabel,
    showCompleted,
    hideOverdueTasks,
    setShowLabel,
    setShowCompleted,
    setHideOverdueTasks,
    setShowSortOptions,
  } = useAuthContext() as AuthContextInterface;

  return (
    <div className="flex flex-col h-min" onClick={(e) => e.stopPropagation()}>
      <EllipsisHorizontalIcon className="h-6 w-6 stroke-cusDarkViolet self-end" />

      <div className="flex flex-col px-3 py-4 bg-white shadow-cusShadowBox rounded-2xl">
        <OptionCard
          containerStyles=""
          Icon={TagIcon}
          event={handleChangeShowLabel}
          text="Show Label"
          checked={showLabel}
        />

        <OptionCard
          containerStyles=""
          Icon={CheckCircleIcon}
          event={handleChangeShowCompleted}
          text="Show Completed"
          checked={showCompleted}
        />

        <OptionCard
          containerStyles=""
          Icon={EyeSlashIcon}
          event={handleChangeHideOverdueTasks}
          text="Hide Overdue Tasks"
          checked={hideOverdueTasks}
        />

        <div
          className="flex items-center w-min mt-1"
          onClick={() => setShowSortOptions(true)}
        >
          <ArrowsUpDownIcon className="h-5 w-5 stroke-cusDarkViolet " />
          <span className="text-sm text-cusDarkGray pl-1">Sort</span>
        </div>
      </div>
    </div>
  );
}

export default ModalTasksOptions;
