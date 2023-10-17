"use client";
import { TaskInterface } from "@/utils/interfaces";
import { Typography } from "@material-tailwind/react";
import TaskCard from "./TaskCard";
import NoTasks from "./NoTasks";

function TaskSection({
  tasks,
  text,
}: {
  tasks: TaskInterface[];
  text: string;
}) {
  return (
    <div>
      <Typography className="text-cusDarkGray text-sm" variant="h6">
        {text}
      </Typography>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={window.crypto.randomUUID()}
            task={task}
          />
        ))
      ) : (
        <NoTasks />
      )}
    </div>
  );
}

export default TaskSection;
