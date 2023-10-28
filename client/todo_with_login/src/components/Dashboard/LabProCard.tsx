"use client";

import {
  AuthContextInterface,
  DashboardContextInterface,
  LabProInterface,
} from "@/utils/interfaces";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { ElementType } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useDashboardContext } from "@/hooks/useDashboardContext";

function LabProCard({
  LabPro,
  Icon,
  type,
}: {
  LabPro: LabProInterface;
  Icon: ElementType;
  type: "l" | "p";
}) {
  const { setSortBy, setIsScroll, setActiveToScroll } =
    useAuthContext() as AuthContextInterface;

  const {
    setAddOrUpdLabel,
    setAddOrUpdProject,
    setLabelToUpdate,
    setProjectToUpdate,
  } = useDashboardContext() as DashboardContextInterface;

  const router = useRouter();

  const handleClick = () => {
    setSortBy(() => {
      if (type === "l") return "label";
      else return "project";
    });
    setIsScroll(true);
    setActiveToScroll(LabPro.title);
    router.push("/tasks");
  };

  const handleButtomEditLabProBehavior = () => {
    if (type === "l") {
      setAddOrUpdLabel({ action: "u", state: true });
      setLabelToUpdate({ id: LabPro.id, title: LabPro.title });
    } else {
      setAddOrUpdProject({ action: "u", state: true });
      setProjectToUpdate({ id: LabPro.id, title: LabPro.title });
    }
  };

  return (
    <div className="flex justify-start items-center gap-4 px-4 py-1 shadow-sm rounded-lg">
      <div onClick={handleClick} className="flex gap-2 items-center">
        <Icon
          className="h-6 w-6 "
          style={
            type === "l" ? { fill: LabPro.color } : { stroke: LabPro.color }
          }
        />
        <span className="text-sm first-letter:uppercase">{LabPro.title}</span>
      </div>

      <span className="text-gray-400 text-sm">{LabPro.tasks.length}</span>

      <div className="flex gap-2 items-center">
        <span
          onClick={handleButtomEditLabProBehavior}
          className="flex items-center justify-center rounded-full p-1 bg-yellow-700"
        >
          <BiEditAlt className="h-4 w-4 fill-white" />
        </span>
        {/**Button edit Label or Project */}
        <span className="flex items-center justify-center rounded-full p-1 bg-red-500">
          <RiDeleteBin2Line className="h-4 w-4 fill-white" />
        </span>
      </div>
    </div>
  );
}

export default LabProCard;
