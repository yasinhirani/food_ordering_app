import axios from "axios";
import { useContext } from "react";
import { LoadingContext } from "../context";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const foodAxios = axios.create({
  baseURL: BASE_URL,
});

const privateAxios = axios.create({
  baseURL: "https://yasin-food-ordering-app.vercel.app/api",
});

const Interceptor = () => {
  const { setLoading } = useContext(LoadingContext);
  privateAxios.interceptors.request.use(
    (req: any) => {
      setLoading(true);
      if (localStorage.authData) {
        const token = JSON.parse(localStorage.authData);
        req.headers.Authorization = `Bearer ${token.access_token}`;
      }
      return req;
    },
    (error) => Promise.reject(error)
  );

  privateAxios.interceptors.response.use((res: any) => {
    setLoading(false);
    return res;
  });

  foodAxios.interceptors.request.use((req: any) => {
    setLoading(true);
    return req;
  });
  
  foodAxios.interceptors.response.use((res: any) => {
    setLoading(false);
    return res;
  });

  axios.interceptors.request.use((req: any) => {
    setLoading(true);
    return req;
  });

  axios.interceptors.response.use((res: any) => {
    setLoading(false);
    return res;
  });

  return null;
};

export { foodAxios, privateAxios, Interceptor };
