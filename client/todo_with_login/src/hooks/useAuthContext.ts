import { useContext } from "react";
import { context } from "@/context/AuthContext";
export const useAuthContext = () => {
  const utilContext = useContext(context);
  return utilContext;
};
