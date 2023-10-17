"use client";
import {
  ListBulletIcon,
  CalendarIcon,
  PlusIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
function BottonMenu() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="fixed bottom-0 flex items-center justify-between h-16 w-full px-6 py-4  bg-white shadow-inner">
      <Link href={"/tasks"}>
        <ListBulletIcon
          className={`h-8 w-8 ${
            pathname === "/tasks"
              ? "stroke-cusDarkViolet"
              : "stroke-blue-gray-300"
          }`}
        />
      </Link>
      <div
        onClick={() => pathname !== "/tasks/add" && router.push("/tasks/add")}
        className="flex items-center justify-center h-12 w-12 rounded-full bg-cusDarkViolet transform rotate-45 -translate-y-7"
      >
        {pathname !== "/tasks/add" ? (
          <>
            <PlusIcon className="relative left-[0.10rem]  h-5 w-5 stroke-white transform -rotate-45" />
            <PencilIcon className="relative right-[0.10rem] h-4 w-4 stroke-white  transform -rotate-45" />
          </>
        ) : (
          <button form="formTask">
            <ArrowUpIcon className="h-6 w-6 stroke-white transform -rotate-45" />
          </button>
        )}
      </div>
      <CalendarIcon className="h-8 w-8 stroke-blue-gray-300" />
    </div>
  );
}

export default BottonMenu;
