import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMeal, IMealDetails, IProducts } from "../shared/models/food.model";
import foodServices from "../shared/services/food.service";
import { v4 as uuidv4 } from "uuid";
import { CartContext, CartTotalContext } from "../core/context";
import cartQuantitiesTotal from "../shared/utils/cartQuantitiesTotal";
import cartSubTotal from "../shared/utils/cartSubTotal";

const ProductDetails = () => {
  const { id, price } = useParams();

  const { cartItems, setCartItems } = useContext(CartContext);
  const { setTotal } = useContext(CartTotalContext);

  const [mealDetails, setMealDetails] = useState<IMealDetails | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [priceAmount, setPriceAmount] = useState<number>(0);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const getMealDetail = (id: number) => {
    foodServices.getMealDetails(id).then((res) => {
      setMealDetails(res.data);
    });
  };

  const addToCart = (product: IMeal) => {
    const productToAdd: IProducts = {
      itemId: +product.idMeal,
      itemImage: product.strMealThumb,
      itemName: product.strMeal,
      price: product.price,
      quantity: quantity,
      orderId: uuidv4(),
      total: product.price * quantity,
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
      copyCart[existingIndex].quantity += quantity;
      copyCart[existingIndex].total =
        copyCart[existingIndex].price * copyCart[existingIndex].quantity;
      setCartItems(copyCart);
    }
  };

  useEffect(() => {
    if (id) {
      getMealDetail(+id);
    }
    if (price) {
      setPriceAmount(+window.atob(price ? price : ""));
    }
    return () => {};
  }, [id, price]);

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
      <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6 flex justify-center items-center">
        <div className="flex space-x-8">
          <figure className="w-96">
            <img
              src={mealDetails?.meals[0].strMealThumb}
              alt=""
              className="rounded-lg"
            />
          </figure>
          <div className="flex flex-col space-y-6">
            <h5 className="font-bold text-3xl">
              {mealDetails?.meals[0].strMeal}
            </h5>
            {mealDetails && (
              <>
                <h6 className="font-semibold text-xl">
                  Price: RS.{priceAmount}
                </h6>
                <h6 className="font-semibold text-xl">
                  Category: {mealDetails?.meals[0].strCategory}
                </h6>
                <h6 className="font-semibold text-xl">
                  Area: {mealDetails?.meals[0].strArea}
                </h6>
              </>
            )}
            {mealDetails && (
              <>
                <div className="flex items-center space-x-5">
                  <button
                    className="font-semibold text-xl disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={quantity === 1}
                    onClick={() => setQuantity((prev) => prev - 1)}
                  >
                    -
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    className="font-semibold text-xl"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    addToCart({
                      price: priceAmount,
                      strMeal: mealDetails.meals[0].strMeal,
                      strMealThumb: mealDetails.meals[0].strMealThumb,
                      idMeal: mealDetails.meals[0].idMeal,
                    })
                  }
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
