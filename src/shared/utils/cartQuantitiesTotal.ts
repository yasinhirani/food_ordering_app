import { IProducts } from "../models/food.model";

const cartQuantitiesTotal = (cartItems: IProducts[]) => {
  const totalQuantities = [...cartItems].reduce(
    (acc, value) => acc + value.quantity,
    0
  );
  return totalQuantities;
};
export default cartQuantitiesTotal;
