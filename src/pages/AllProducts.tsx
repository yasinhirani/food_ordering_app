import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealCard from "../components/MealCard";
import { CartContext, CartTotalContext } from "../core/context";
import { IMeal, IProducts } from "../shared/models/food.model";
import foodServices from "../shared/services/food.service";
import { v4 as uuidv4 } from "uuid";
import cartQuantitiesTotal from "../shared/utils/cartQuantitiesTotal";
import cartSubTotal from "../shared/utils/cartSubTotal";

const AllProducts = () => {
  const { category } = useParams();

  const { cartItems, setCartItems } = useContext(CartContext);
  const { setTotal } = useContext(CartTotalContext);

  const [allMeals, setAllMeals] = useState<IMeal[]>([]);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const getAllMeals = (category: string) => {
    foodServices.getAllMealsForSpecificCategory(category).then((res) => {
      const updatedMealData = [...res.data.meals].map((data) => {
        return { ...data, price: Math.floor(Math.random() * 41 + 10) * 10 };
      });
      setAllMeals(updatedMealData);
    });
  };

  const addToCart = (product: IMeal) => {
    const productToAdd: IProducts = {
      itemId: +product.idMeal,
      itemImage: product.strMealThumb,
      itemName: product.strMeal,
      price: product.price,
      quantity: 1,
      orderId: uuidv4(),
      total: product.price,
    };
    const existingIndex = cartItems.findIndex(
      (prod) => prod.itemId === productToAdd.itemId
    );
    if (existingIndex === -1) {
      setCartItems((prev) => {
        return [...prev, productToAdd];
      });
    } else {
      const copyCart = [...cartItems];
      copyCart[existingIndex].quantity += 1;
      copyCart[existingIndex].total =
        copyCart[existingIndex].price * copyCart[existingIndex].quantity;
      setCartItems(copyCart);
    }
  };

  useEffect(() => {
    if (category) {
      getAllMeals(category);
    }
    return () => {};
  }, [category]);

  useEffect(() => {
    const copyCart = [...cartItems];
    setTotal({
      totalQuantities: cartQuantitiesTotal(copyCart),
      subTotal: cartSubTotal(copyCart),
    });
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    localStorage.setItem("products", JSON.stringify(copyCart));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div className="flex-grow h-full mt-20">
      <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6">
        <h4 className="text-2xl font-bold">Results For "{category}"</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-8">
          {allMeals &&
            allMeals.map((meal) => (
              <MealCard meal={meal} addToCart={addToCart} key={Math.random()} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
