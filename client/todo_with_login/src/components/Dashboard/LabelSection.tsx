import { AuthContextInterface } from "@/utils/interfaces";
import { useAuthContext } from "@/hooks/useAuthContext";
import { BsTag } from "react-icons/bs";
import LabProCard from "./LabProCard";
import { Collapse } from "@material-tailwind/react";

function LabelSection({ isShow }: { isShow: boolean }) {
  const { labels } = useAuthContext() as AuthContextInterface;
  return (
    <Collapse open={isShow}>
      <div
        className={`${
          labels.length > 0
            ? "flex flex-col items-start gap-4 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4"
            : "flex justify-center"
        }`}
      >
        {labels.length > 0 ? (
          labels.map((label) => (
            <LabProCard
              type="l"
              LabPro={label}
              Icon={BsTag}
              key={window.crypto.randomUUID()}
            />
          ))
        ) : (
          <div className="text-sm text-center text-blue-gray-300 ">
            No labels yet
          </div>
        )}
      </div>
    </Collapse>
  );
}

export default LabelSection;
