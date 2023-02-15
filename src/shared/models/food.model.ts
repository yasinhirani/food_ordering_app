import { IBase } from "../../core/models/core.model";

// Start Food categories
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
export interface ICategories {
  categories: Category[];
}
// End Food categories

// Start all meals for specific category
export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
export interface IMeals {
  meals: Meal[];
}
// End all meals for specific category

// Start meal details
export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strTags: string;
}
export interface IMealDetails {
  meals: MealDetail[];
}
// End meal details

export interface ICategoriesRes extends IBase<ICategories> {}
export interface IMealsRes extends IBase<IMeals> {}
export interface IMealDetailsRes extends IBase<IMealDetails> {}
