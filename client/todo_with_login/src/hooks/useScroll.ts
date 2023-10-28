import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthContextInterface } from "@/utils/interfaces";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const useScroll = () => {
  const { elementToScroll, isScroll, setIsScroll } =
    useAuthContext() as AuthContextInterface;
  useEffect(() => {
    const loadScroll = async () => {
      await sleep();
      if (isScroll) {
        elementToScroll.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setIsScroll(false);
      }
    };
    loadScroll();
  }, []);
};
