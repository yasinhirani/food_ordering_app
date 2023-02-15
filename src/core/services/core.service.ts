import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const foodAxios = axios.create({
  baseURL: BASE_URL,
});

export default foodAxios;
