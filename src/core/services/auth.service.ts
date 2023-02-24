import axios from "axios";
import { ILoginRes, IRegisterRes } from "../../shared/models/auth.model";

const login = (email: string, password: string): Promise<ILoginRes> => {
  return axios.post("http://localhost:8080/api/login", {
    userEmail: email,
    password: password,
  });
};

const register = (
  name: string,
  email: string,
  password: string
): Promise<IRegisterRes> => {
  return axios.post("http://localhost:8080/api/register", {
    userName: name,
    userEmail: email,
    password: password,
  });
};

const authServices = {
  login,
  register,
};

export default authServices;
