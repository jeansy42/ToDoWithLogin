import axios from "./axios";
import { LabProInterface } from "./interfaces";

export const getLabels = async (): Promise<LabProInterface[]> => {
  const res = await axios.get("/labels");
  return res.data;
};

export const createLabel = async (csrf: string, label: { title: string }) => {
  const res = await axios.post("/labels/add", label, {
    headers: { "X-CSRF-TOKEN": csrf },
  });
  return res.data;
};

export const verifyLabelCreation = async (
  title: { title: string },
  csrf: string
) => {
  const res = await axios.post("/labels/verify_creation", title, {
    headers: { "X-CSRF-TOKEN": csrf },
  });
  return res.data;
};
