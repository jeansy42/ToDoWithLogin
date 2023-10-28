import axios from "./axios";
import { LabProInterface } from "./interfaces";

export const getProjects = async (): Promise<LabProInterface[]> => {
  const res = await axios.get("/projects");
  return res.data;
};

export const createProject = async (
  csrf: string,
  project: { title: string }
) => {
  const res = await axios.post("/projects/add", project, {
    headers: { "X-CSRF-TOKEN": csrf },
  });
  return res.data;
};

export const verifyProjectCreation = async (
  title: { title: string },
  csrf: string
) => {
  const res = await axios.post("/projects/verify_creation", title, {
    headers: { "X-CSRF-TOKEN": csrf },
  });
  return res.data;
};
