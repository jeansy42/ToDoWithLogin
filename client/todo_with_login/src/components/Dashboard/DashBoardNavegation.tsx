"use client";

import Link from "next/link";
import { CiCircleList, CiCalendar } from "react-icons/ci";

function DashBoardNavegation() {
  return (
    <div className="flex justify-center gap-16">
      <div className="flex flex-col gap-4 items-center">
        <span className="text-cusDarkGray text-sm font-bold">List</span>
        <Link href={"/tasks"}>
          <CiCircleList className="h-8 w-8  fill-cusDarkViolet stroke-[0.5] stroke-cusDarkViolet" />
        </Link>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <span className="text-cusDarkGray text-sm font-bold">Calendar</span>
        <CiCalendar className="h-8 w-8  fill-cusDarkViolet stroke-[0.5] stroke-cusDarkViolet" />
      </div>
    </div>
  );
}

export default DashBoardNavegation;
