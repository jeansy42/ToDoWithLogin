import {
  AddOrUpdLabPro,
  DashboardContextInterface,
  LabProToUpdateInterface,
} from "@/utils/interfaces";
import { ReactNode, createContext, useState } from "react";
export const dashboardContext = createContext<
  undefined | DashboardContextInterface
>(undefined);
function DashboardContext({ children }: { children: ReactNode }) {
  const [addOrUpdLabel, setAddOrUpdLabel] = useState<AddOrUpdLabPro>({
    state: false,
    action: "a",
  });
  const [addOrUpdProject, setAddOrUpdProject] = useState<AddOrUpdLabPro>({
    state: false,
    action: "a",
  });
  const [refreshLabels, setRefreshLabels] = useState(0);
  const [refreshProjects, setRefreshProjects] = useState(0);
  const [labelToUpdate, setLabelToUpdate] = useState<LabProToUpdateInterface>({
    id: -1,
    title: "",
  });
  const [projectToUpdate, setProjectToUpdate] =
    useState<LabProToUpdateInterface>({
      id: -1,
      title: "",
    });
  return (
    <dashboardContext.Provider
      value={{
        addOrUpdLabel,
        addOrUpdProject,
        setAddOrUpdProject,
        setAddOrUpdLabel,
        refreshLabels,
        setRefreshLabels,
        refreshProjects,
        setRefreshProjects,
        labelToUpdate,
        setLabelToUpdate,
        projectToUpdate,
        setProjectToUpdate,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
}

export default DashboardContext;
