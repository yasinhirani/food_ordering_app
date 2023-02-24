import { useEffect, useMemo, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./core/components/ProtectedRoute";
import { AuthContext, CartContext, CartTotalContext } from "./core/context";
import {
  AllProducts,
  Cart,
  HomePage,
  MyOrders,
  Navbar,
  ProductDetails,
  Auth,
} from "./pages/index";
import { IAuthData } from "./shared/models/auth.model";
import { ICartTotal, IProducts } from "./shared/models/food.model";

function App() {
  const [cartItems, setCartItems] = useState<IProducts[]>([]);
  const [total, setTotal] = useState<ICartTotal | null>(null);
  const [authData, setAuthData] = useState<IAuthData | null>(null);

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

  const AuthDataState = useMemo(
    () => ({
      authData,
      setAuthData,
    }),
    [authData]
  );

  useEffect(() => {
    if (localStorage.getItem("products")) {
      const products = JSON.parse(localStorage.products);
      setCartItems(products);
    } else {
      setCartItems([]);
    }
    if (localStorage.getItem("authData")) {
      setAuthData(JSON.parse(localStorage.authData));
    } else {
      setAuthData(null);
    }
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={AuthDataState}>
      <CartContext.Provider value={cartItemsState}>
        <CartTotalContext.Provider value={cartTotalState}>
          <div className="w-full h-full flex flex-col">
            <Navbar />
            <div className="flex-grow h-full flex flex-col">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/gettingStarted"
                  element={<ProtectedRoute Component={Auth} />}
                />
                <Route
                  path="/allProducts/:category"
                  element={<AllProducts />}
                />
                <Route
                  path="/productDetail/:id/:price"
                  element={<ProductDetails />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/myOrders" element={<MyOrders />} />
              </Routes>
            </div>
          </div>
        </CartTotalContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
