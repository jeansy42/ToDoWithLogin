"use client";
import { Collapse, Spinner } from "@material-tailwind/react";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthContextInterface } from "@/utils/interfaces";

function StatusSection({
  isShow,
  isLoad,
}: {
  isShow: boolean;
  isLoad: boolean;
}) {
  const { completedTasks, pendingTasks } =
    useAuthContext() as AuthContextInterface;
  return (
    <Collapse open={isShow}>
      <div className="flex justify-evenly px-4">
        <div className="flex gap-2 items-center">
          <MdOutlinePendingActions className="h-6 w-6 fill-red-600" />
          <span className="text-sm  ">To do</span>
          {isLoad ? (
            <Spinner color="red" className="w-3 h-3 " />
          ) : (
            <span className="text-sm text-red-600">{pendingTasks.length}</span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <AiOutlineCheck className="h-6 w-6 fill-green-600 " />
          <span className="text-sm ">Done</span>
          {isLoad ? (
            <Spinner color="green" className="w-3 h-3 " />
          ) : (
            <span className="text-sm text-green-600">
              {completedTasks.length}
            </span>
          )}
        </div>
      </div>
    </Collapse>
  );
}

export default StatusSection;
