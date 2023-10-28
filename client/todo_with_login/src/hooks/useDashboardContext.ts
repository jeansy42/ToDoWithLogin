import { dashboardContext } from "@/context/DashboardContext";
import { useContext } from "react";
export const useDashboardContext = () => {
  const utilContext = useContext(dashboardContext);
  return utilContext;
};
