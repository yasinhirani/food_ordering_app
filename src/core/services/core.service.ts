import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const foodAxios = axios.create({
  baseURL: BASE_URL,
});

const privateAxios = axios.create({
  baseURL: "https://yasin-food-ordering-app.vercel.app/api",
});

privateAxios.interceptors.request.use(
  (req: any) => {
    if (localStorage.authData) {
      const token = JSON.parse(localStorage.authData);
      req.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export { foodAxios, privateAxios };
