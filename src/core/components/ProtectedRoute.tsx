import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartQuantitiesTotal from "../../shared/utils/cartQuantitiesTotal";
import cartSubTotal from "../../shared/utils/cartSubTotal";
import { CartContext, CartTotalContext } from "../context";

const ProtectedRouteLogin = ({ Component }: any) => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const { setTotal } = useContext(CartTotalContext);
  useEffect(() => {
    const authData = localStorage.authData;
    if (localStorage.getItem("products")) {
      const products = JSON.parse(localStorage.products);
      setCartItems(products);
    } else {
      setCartItems([]);
    }
    if (authData) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotal({
      totalQuantities: cartQuantitiesTotal(cartItems),
      subTotal: cartSubTotal(cartItems),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return <Component />;
};

const ProtectedRoute = ({ Component }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authData = localStorage.authData;
    if (!authData) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component />;
};

export { ProtectedRoute, ProtectedRouteLogin };
