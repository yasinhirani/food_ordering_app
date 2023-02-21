import React from "react";
import { IBase } from "../../core/models/core.model";

export interface IProducts {
  itemId: number;
  orderId: string;
  itemName: string;
  price: number;
  quantity: number;
  itemImage: string;
  total: number;
}
export interface ICartItemsContext {
  cartItems: IProducts[];
  setCartItems: React.Dispatch<React.SetStateAction<IProducts[]>>;
}

export interface ICartTotal {
  totalQuantities: number;
  subTotal: number;
}

export interface ICartTotalContext {
  total: ICartTotal | null;
  setTotal: React.Dispatch<React.SetStateAction<ICartTotal | null>>;
}

// Start Food categories
export interface ICategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
export interface ICategories {
  categories: ICategory[];
}
// End Food categories

// Start all meals for specific category
export interface IMeal {
  price: number;
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
export interface IMeals {
  meals: IMeal[];
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
