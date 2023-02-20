import { createContext } from "react";
import {
  ICartItemsContext,
  ICartTotalContext,
} from "../shared/models/food.model";

export const CartContext = createContext<ICartItemsContext>({
  cartItems: [],
  setCartItems: () => [],
});
export const CartTotalContext = createContext<ICartTotalContext>({
  total: null,
  setTotal: () => {},
});
