import { IProducts } from "../models/food.model";

const cartSubTotal = (cartItems: IProducts[]) => {
  const subTotal = [...cartItems].reduce((acc, value) => acc + value.total, 0);
  return subTotal;
};
export default cartSubTotal;
