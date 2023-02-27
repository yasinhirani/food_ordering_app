import { createContext } from "react";
import { IAuthContext, ILoadingContext } from "../shared/models/auth.model";
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
export const AuthContext = createContext<IAuthContext>({
  authData: null,
  setAuthData: () => {},
});
export const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: () => {},
});
