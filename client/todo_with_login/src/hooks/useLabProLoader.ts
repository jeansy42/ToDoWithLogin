import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthContextInterface } from "../utils/interfaces";
import { getLabels } from "../utils/requestsLabels";
import { getProjects } from "../utils/requestsProjects";
import { addColors } from "../utils/auxiliarFunctions";
import { labelsColors, projectsColors } from "../utils/colors";

export const useLabelsLoader = () => {
  const { setLabels, refreshLabels } = useAuthContext() as AuthContextInterface;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getLabelsOfUser = async () => {
      try {
        setIsLoading(true);
        const labels = await getLabels();
        const okLabels = addColors(labelsColors, labels);
        setLabels(okLabels);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getLabelsOfUser();
  }, [refreshLabels]);
  return isLoading;
};

export const useProjectsLoader = () => {
  const { setProjects, refreshProjects } =
    useAuthContext() as AuthContextInterface;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getProjectsOfUser = async () => {
      try {
        setIsLoading(true);
        const projects = await getProjects();
        const okProjects = addColors(projectsColors, projects);
        setProjects(okProjects);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProjectsOfUser();
  }, [refreshProjects]);
  return isLoading;
};
