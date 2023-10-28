"use client";
import { Collapse } from "@material-tailwind/react";
import { AuthContextInterface } from "@/utils/interfaces";
import { useAuthContext } from "@/hooks/useAuthContext";
import { TbFilePencil } from "react-icons/tb";
import LabProCard from "./LabProCard";

function ProjectSection({ isShow }: { isShow: boolean }) {
  const { projects } = useAuthContext() as AuthContextInterface;
  return (
    <Collapse open={isShow}>
      <div
        className={`${
          projects.length > 0
            ? "flex flex-col items-start gap-4"
            : "flex justify-center"
        }`}
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <LabProCard
              type="p"
              LabPro={project}
              Icon={TbFilePencil}
              key={window.crypto.randomUUID()}
            />
          ))
        ) : (
          <div className="text-sm text-center text-blue-gray-300 ">
            No projects yet
          </div>
        )}
      </div>
    </Collapse>
  );
}

export default ProjectSection;
