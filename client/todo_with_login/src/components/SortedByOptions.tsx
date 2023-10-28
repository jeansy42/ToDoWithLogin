"use client";

import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import OptionCard from "./subcomponents/OptionCard";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthContextInterface } from "@/utils/interfaces";

function SortedByOptions() {
  const { sortBy, setSortBy, setShowSortOptions, setShowTasksOptions } =
    useAuthContext() as AuthContextInterface;
  const handleSortbyDueDate = () => setSortBy("due_date");
  const handleSortbyPriority = () => setSortBy("priority");
  const handleSortbyLabel = () => setSortBy("label");
  const handleSortByProject = () => setSortBy("project");
  return (
    <div className="flex flex-col self-center h-min w-full px-3 py-4 bg-white rounded-2xl shadow-cusShadowBox">
      <div className="flex justify-between mb-4">
        <span className="m-auto font-semibold text-sm text-cusDarkGray ">
          Sort by
        </span>
        <XMarkIcon
          className="h-5 w-5 mr-[0.6rem] stroke-blue-gray-300"
          onClick={() => {
            setShowSortOptions(false);
            setShowTasksOptions(false);
          }}
        />
      </div>

      <OptionCard
        containerStyles="justify-between"
        Icon={CalendarDaysIcon}
        text="Due Date"
        event={handleSortbyDueDate}
        checked={sortBy === "due_date"}
      />

      <OptionCard
        containerStyles="justify-between"
        Icon={ExclamationTriangleIcon}
        text="Priority"
        event={handleSortbyPriority}
        checked={sortBy === "priority"}
      />

      <OptionCard
        containerStyles="justify-between"
        Icon={TagIcon}
        text="Label"
        event={handleSortbyLabel}
        checked={sortBy === "label"}
      />

      <OptionCard
        containerStyles="justify-between"
        Icon={ClipboardDocumentListIcon}
        text="Project"
        event={handleSortByProject}
        checked={sortBy === "project"}
      />
    </div>
  );
}

export default SortedByOptions;
