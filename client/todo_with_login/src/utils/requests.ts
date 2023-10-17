import axios from "./axios";
import {
  CredentialsInterface,
  NewUserInterface,
  TaskInterface,
} from "./interfaces";

export const login = async (credentials: CredentialsInterface) => {
  const res = await axios.post("/user/login", credentials);
  return res;
};
export const verifyIsAuthenticated = async () => {
  const res = await axios.get("/verify");
  return res;
};
export const verifyIfEmailExists = async (email: string) => {
  const res = await axios.get(`/verify_email?email=${email}`);
  return res;
};
export const logout = async () => {
  const res = await axios.get("/user/logout");
  return res;
};

export const createUser = async (user: NewUserInterface) => {
  const res = await axios.post("/user/sing_in", user);
  return res;
};

export const createTask = async (task: TaskInterface, csrf: string) => {
  const res = await axios.post("/tasks/add", task, {
    headers: { "X-CSRF-TOKEN": csrf },
  });
  return res;
};


