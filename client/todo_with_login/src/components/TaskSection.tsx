"use client";
import { AuthContextInterface, TaskInterface } from "@/utils/interfaces";
import { Typography } from "@material-tailwind/react";
import TaskCard from "./TaskCard";
import NoTasks from "./NoTasks";
import { useAuthContext } from "@/hooks/useAuthContext";

function TaskSection({
  tasks,
  text,
}: {
  tasks: TaskInterface[];
  text: string;
}) {
  const { activeToScroll, elementToScroll } =
    useAuthContext() as AuthContextInterface;
  return (
    <div>
      <Typography
        ref={activeToScroll === text ? elementToScroll : null}
        className="text-cusDarkGray text-sm first-letter:uppercase"
        variant="h6"
      >
        {text}
      </Typography>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={window.crypto.randomUUID()} task={task} />
        ))
      ) : (
        <NoTasks />
      )}
    </div>
  );
}

export default TaskSection;
