import { useEffect, useMemo, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Loader from "./core/components/Loader";
import {
  ProtectedRoute,
  ProtectedRouteLogin,
} from "./core/components/ProtectedRoute";
import {
  AuthContext,
  CartContext,
  CartTotalContext,
  LoadingContext,
} from "./core/context";
import { Interceptor } from "./core/services/core.service";
import Admin from "./pages/admin/Admin";
import {
  AllProducts,
  Cart,
  HomePage,
  MyOrders,
  Navbar,
  ProductDetails,
  Auth,
} from "./pages/index";
import NotFound from "./pages/NotFound";
import { IAuthData } from "./shared/models/auth.model";
import { ICartTotal, IProducts } from "./shared/models/food.model";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cartItems, setCartItems] = useState<IProducts[]>([]);
  const [total, setTotal] = useState<ICartTotal | null>(null);
  const [authData, setAuthData] = useState<IAuthData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  const LoadingState = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading]
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
          <LoadingContext.Provider value={LoadingState}>
            <Interceptor />
            {loading && <Loader />}
            <div
              className={`w-full h-full flex flex-col ${
                loading ? "overflow-hidden" : "overflow-auto"
              }`}
            >
              <Navbar />
              <div className="flex-grow h-full flex flex-col">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/gettingStarted"
                    element={<ProtectedRouteLogin Component={Auth} />}
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
                  <Route
                    path="/myOrders"
                    element={<ProtectedRoute Component={MyOrders} />}
                  />
                  {authData !== null && authData.role === "admin" && (
                    <Route path="/admin" element={<Admin />} />
                  )}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
            <ToastContainer />
          </LoadingContext.Provider>
        </CartTotalContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
