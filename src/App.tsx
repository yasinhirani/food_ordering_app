import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.css";
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

function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="flex-grow h-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myOrders" element={<MyOrders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
