"use client";

import { useDashboardContext } from "@/hooks/useDashboardContext";
import { AddOrUpdLabPro, DashboardContextInterface } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import { BsPlusLg } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

function DashboardSection({
  text,
  action,
  state,
  isForm,
  setIsform,
}: {
  text: string;
  action: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  isForm: boolean | undefined;
  setIsform: React.Dispatch<React.SetStateAction<AddOrUpdLabPro>> | undefined;
}) {
  const router = useRouter();
  const {} = useDashboardContext() as DashboardContextInterface;

  const handleButtomPlusBehavior = () => {
    if (setIsform) {
      if (isForm)
        setIsform((prev) => {
          return { ...prev, state: false };
        });
      else setIsform({ action: "a", state: true });
    } else router.push("/tasks/add");
  };
  
  return (
    <div className=" flex justify-between items-center mb-4">
      <span className="text-cusDarkGray text-sm font-bold">{text}</span>
      <div className="flex items-center gap-3">
        <IoIosArrowDown
          className={`h-6 w-6 fill-gray-500 ${
            state ? "" : "transform -rotate-90"
          } transition-all`}
          onClick={() => action(!state)}
        />
        {/**Buttom + */}
        <BsPlusLg
          onClick={handleButtomPlusBehavior}
          className={`h-5 w-5  stroke-[0.4] transition-all  ${
            isForm
              ? "transform rotate-45 fill-red-500 stroke-red-500"
              : "fill-gray-500 stroke-gray-500"
          }`}
        />
      </div>
    </div>
  );
}

export default DashboardSection;
