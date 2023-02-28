import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ICategory, IMeal } from "../shared/models/food.model";
import foodServices from "../shared/services/food.service";
import { CartContext, CartTotalContext } from "../core/context";
import { IProducts } from "../shared/models/food.model";
import cartQuantitiesTotal from "../shared/utils/cartQuantitiesTotal";
import cartSubTotal from "../shared/utils/cartSubTotal";
import { v4 as uuidv4 } from "uuid";
import Footer from "../components/Footer";
import MealCard from "../components/MealCard";
import { toast } from "react-toastify";
import toastConfig from "../shared/utils/toastifyConfig";
import priceArray from "../shared/utils/priceArray";

const HomePage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { setTotal } = useContext(CartTotalContext);

  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [mealForCategory, setMealForCategory] = useState<IMeal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Chicken");
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const menuRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const next = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollLeft += 200;
    }
  };
  const prev = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollLeft -= 200;
    }
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
      if (copyCart[existingIndex].quantity > 4) {
        toast.warning(
          "Only 5 quantity for a product can be added at a time",
          toastConfig
        );
      } else {
        copyCart[existingIndex].quantity += 1;
        copyCart[existingIndex].total =
          copyCart[existingIndex].price * copyCart[existingIndex].quantity;
        setCartItems(copyCart);
      }
    }
  };

  const getAllCategories = () => {
    foodServices.getCategories().then((res) => {
      setAllCategories(res.data.categories);
    });
  };

  const getAllMealsForCategory = (category: string) => {
    foodServices.getAllMealsForSpecificCategory(category).then((res) => {
      const mealData =
        res.data.meals.length > 7 ? res.data.meals.slice(0, 8) : [];
      if (res.data.meals.length > 7) {
        const updatedMealData = [...mealData].map((data, index) => {
          return { ...data, price: priceArray[index] };
        });
        setMealForCategory(updatedMealData);
      } else {
        const updatedMealData = [...res.data.meals].map((data, index) => {
          return { ...data, price: priceArray[index] };
        });
        setMealForCategory(updatedMealData);
      }
    });
  };

  useEffect(() => {
    getAllCategories();
    return () => {};
  }, []);

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

  useEffect(() => {
    getAllMealsForCategory(selectedCategory);
    return () => {};
  }, [selectedCategory]);

  return (
    <div className="flex-grow h-full mt-20">
      {/* Start Hero Section */}
      <div className="bg-primary">
        <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6 flex justify-between items-center space-x-5">
          <div className="sm:space-y-10">
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl lg:w-[20ch] tracking-wider lg:leading-[60px]">
              Just don’t wait for the right moment, order your food now.
            </h1>
            <figure className="w-full min-w-[300px] block sm:hidden">
              <img
                className="w-full h-full"
                src="/images/hero_illustration.png"
                alt=""
              />
            </figure>
            <button
              onClick={() =>
                menuRef.current &&
                menuRef.current.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-red-600 px-4 py-3 rounded-md hover:rounded-3xl transition-all text-white w-full sm:w-52"
            >
              Order Now
            </button>
          </div>
          <figure className="w-full min-w-[320px] hidden sm:block">
            <img
              className="w-full h-full"
              src="/images/hero_illustration.png"
              alt=""
            />
          </figure>
        </div>
      </div>
      {/* End Hero Section */}
      {/* Start Services section */}
      <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6 h-96 flex flex-col justify-center items-center space-y-10">
        <p className="text-4xl font-bold relative before:absolute before:w-28 before:-bottom-2 before:h-1 before:bg-red-600 before:rounded-lg">
          Services
        </p>
        <div className="flex justify-evenly items-center space-x-5 w-full">
          <figure className="flex flex-col items-center">
            <img
              className="w-full max-w-[80px]"
              src="/images/order_online.png"
              alt="Order Online"
            />
            <figcaption className="font-bold text-sm mt-3 text-center">
              Order Online
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img
              className="w-full max-w-[80px]"
              src="/images/order_preperation.png"
              alt="Order Preparation"
            />
            <figcaption className="font-bold text-sm mt-3 text-center">
              Order Preparation
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img
              className="w-full max-w-[80px]"
              src="/images/order_handover.png"
              alt="Order Handover"
            />
            <figcaption className="font-bold text-sm mt-3 text-center">
              Order Handover
            </figcaption>
          </figure>
        </div>
      </div>
      {/* End Services section */}
      {/* Start Menu section */}
      <div ref={menuRef} className="bg-primary">
        <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-10 flex flex-col space-y-16 overflow-hidden relative">
          <div>
            {/* Start Next Button */}
            <button
              className="bg-red-400 hover:bg-red-600 text-white absolute w-8 h-8 rounded-full left-2 md:left-8 top-[245px] text-xs"
              onClick={prev}
            >
              &lt;
            </button>
            {/* End Next Button */}
            {/* Start Previous Button */}
            <button
              className="bg-red-400 hover:bg-red-600 text-white absolute w-8 h-8 rounded-full right-2 md:right-8 top-[245px] text-xs"
              onClick={next}
            >
              &gt;
            </button>
            {/* End Previous Button */}
          </div>
          <p className="text-4xl font-bold text-center relative before:absolute before:w-28 before:-bottom-2 before:h-1 before:bg-red-600 before:rounded-lg">
            Our Menu
          </p>
          <div
            ref={categoryRef}
            className="flex items-center space-x-8 overflow-x-auto scrollbar-none"
          >
            {allCategories &&
              allCategories.map((category) => (
                <button
                  className={`${
                    selectedCategory === category.strCategory
                      ? "bg-red-500 p-2 rounded-lg text-white"
                      : "rounded-lg text-black p-2"
                  }`}
                  key={Math.random()}
                  onClick={() => {
                    setSelectedCategory(category.strCategory);
                    setMealForCategory([]);
                  }}
                >
                  <figure className="flex flex-col items-center w-full h-full">
                    <img
                      className="w-full h-full min-w-[90px] max-w-[90px] rounded-full"
                      src={category.strCategoryThumb}
                      alt="Order Online"
                    />
                    <figcaption className="font-bold text-sm mt-3">
                      {category.strCategory}
                    </figcaption>
                  </figure>
                </button>
              ))}
          </div>
          <div className="bg-white p-5 sm:p-10 rounded-xl">
            {mealForCategory.length === 0 && (
              <p className="text-xl font-semibold text-center p-5">
                Loading...
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
              {mealForCategory &&
                mealForCategory.map((meal) => (
                  <MealCard
                    meal={meal}
                    addToCart={addToCart}
                    key={Math.random()}
                  />
                ))}
            </div>
            <div className="flex justify-center mt-10">
              <Link
                to={`/allProducts/${selectedCategory}`}
                className="w-52 bg-red-500 text-white px-6 py-2 text-center rounded-lg"
              >
                See All
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End Menu section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
};

export default HomePage;
