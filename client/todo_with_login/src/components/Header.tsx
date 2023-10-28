"use client";
import { useState } from "react";
import Image from "next/image";
import avatarPic from "@/style/images/avatar-1577909_1280.png";
import { Cog6ToothIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AuthContextInterface } from "@/utils/interfaces";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const { user, setSortBy, sortBy, setShowTasksOptions } =
    useAuthContext() as AuthContextInterface;
  const pathname = usePathname();
  let today = new Date().toDateString();
  return (
    <header className="relative mb-4 pt-6 pb-3 px-3  bg-cusLigthViolet shadow-md overflow-hidden z-10">
      {/**Avatar/Search/Options */}
      <div className="absolute h-36 w-36 -bottom-8 -left-8 rounded-full bg-cusGrayishViolet z-[-1]"></div>
      <div className="flex justify-between items-center">
        {pathname === "/" ? (
          <div className="flex gap-2 items-center">
            <Link href={"/tasks"}>
              <Image
                className="h-8 w-8 rounded-full  "
                alt="Avatar"
                src={avatarPic}
              />
            </Link>

            <span className="text-white font-bold">{user?.username}</span>
          </div>
        ) : (
          <Link href={"/"}>
            <Squares2X2Icon className="h-6 w-6 stroke-white" />
          </Link>
        )}
        {pathname !== "/" && (
          <form>
            <div className="flex items-center gap-2 rounded-xl pl-2 bg-white">
              <MagnifyingGlassIcon className="h-4 w-4 fill-blue-gray-300" />
              <input
                className="rounded-xl py-1 text-sm text-blue-gray-300 placeholder:text-sm outline-none"
                role="search"
                type="text"
                placeholder="Search task..."
              />
            </div>
          </form>
        )}
        <div className="p-3 rounded-full bg-cusGrayishViolet">
          {pathname === "/" ? (
            <Cog6ToothIcon className="h-6 w-6 stroke-white" />
          ) : (
            <EllipsisHorizontalIcon
              className="h-6 w-6 fill-white"
              onClick={() => setShowTasksOptions(true)}
            />
          )}
        </div>
      </div>
      {/**Dashboard */}
      <div className="mt-2 text-white">
        <p className="text-xs">{`Today, ${today}`}</p>
        {pathname !== "/" ? (
          <h1 className="font-semibold">My tasks</h1>
        ) : (
          <h2 className="font-semibold">Dashboard</h2>
        )}
      </div>
    </header>
  );
}

export default Header;
