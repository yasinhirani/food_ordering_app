import axios from "axios";
import { ILoginRes, IRegisterRes } from "../../shared/models/auth.model";

const login = (email: string, password: string): Promise<ILoginRes> => {
  return axios.post(
    "https://yasin-food-ordering-app.vercel.app/api/login",
    {
      userEmail: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const register = (
  name: string,
  email: string,
  password: string
): Promise<IRegisterRes> => {
  return axios.post("https://yasin-food-ordering-app.vercel.app/api/register", {
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
