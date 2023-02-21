import { useMemo, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.css";
import { CartContext, CartTotalContext } from "./core/context";
import {
  AllProducts,
  Cart,
  HomePage,
  Login,
  MyOrders,
  Navbar,
  ProductDetails,
  SignUp,
} from "./pages/index";
import { ICartTotal, IProducts } from "./shared/models/food.model";

function App() {
  const [cartItems, setCartItems] = useState<IProducts[]>([]);
  const [total, setTotal] = useState<ICartTotal | null>(null);

  const cartItemsState = useMemo(
    () => ({
      cartItems,
      setCartItems,
    }),
    [cartItems]
  );

  const cartTotalState = useMemo(
    () => ({
      total,
      setTotal,
    }),
    [total]
  );

  return (
    <CartContext.Provider value={cartItemsState}>
      <CartTotalContext.Provider value={cartTotalState}>
        <div className="w-full h-full flex flex-col">
          <Navbar />
          <div className="flex-grow h-full flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/allProducts/:category" element={<AllProducts />} />
              <Route path="/productDetails" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/myOrders" element={<MyOrders />} />
            </Routes>
          </div>
        </div>
      </CartTotalContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
