"use client";
import cookies from "js-cookie";
import { AuthContextInterface } from "@/utils/interfaces";
import { verifyIsAuthenticated } from "@/utils/requests";
import { useAuthContext } from "@/utils/useAuthContext";
import { redirect, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";
import Header from "./Header";
import BottonMenu from "./BottonMenu";
import TasksOptions from "./TasksOptions";

function ProtectedRoutes({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    showTasksOptions,
    setCsrfToken,
  } = useAuthContext() as AuthContextInterface;
  const pathname = usePathname();

  useEffect(() => {
    const get_verify = async () => {
      try {
        const res = await verifyIsAuthenticated();
        setUser(res.data.user);
        setIsAuthenticated(true);
        setCsrfToken(cookies.get("csrf_access_token"));
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    get_verify();
  }, [isAuthenticated, setIsAuthenticated, setUser, setCsrfToken]);

  if (isLoading) return <SpinnerLoading size={12} />;
  if (isAuthenticated)
    return (
      <>
        {showTasksOptions && <TasksOptions />}
        <div className={`${showTasksOptions ? "blur-sm overflow-hidden" : ""}`}>
          <Header />
          <div className="mb-16">{children}</div>
          {pathname !== "/" && <BottonMenu />}
        </div>
      </>
    );
  else redirect("/login");
}

export default ProtectedRoutes;
