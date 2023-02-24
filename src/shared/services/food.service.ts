import { foodAxios } from "../../core/services/core.service";
import {
  ICategoriesRes,
  IMealDetailsRes,
  IMealsRes,
} from "../models/food.model";

const getCategories = (): Promise<ICategoriesRes> => {
  return foodAxios.get("/categories.php");
};

const getAllMealsForSpecificCategory = (
  category: string
): Promise<IMealsRes> => {
  return foodAxios.get(`/filter.php?c=${category}`);
};

const getMealDetails = (id: number): Promise<IMealDetailsRes> => {
  return foodAxios.get(`/lookup.php?i=${id}`);
};

const foodServices = {
  getCategories,
  getAllMealsForSpecificCategory,
  getMealDetails,
};

export default foodServices;
