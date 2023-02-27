import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext, CartContext, CartTotalContext } from "../core/context";
import { IOrder } from "../shared/models/orders.model";
import OrdersService from "../shared/services/orders.service";
import cartQuantitiesTotal from "../shared/utils/cartQuantitiesTotal";
import cartSubTotal from "../shared/utils/cartSubTotal";
import toastConfig from "../shared/utils/toastifyConfig";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { total, setTotal } = useContext(CartTotalContext);
  const { authData } = useContext(AuthContext);

  const navigate = useNavigate();

  const [initialRender, setInitialRender] = useState<boolean>(true);
  const [codSelected, setCodSelected] = useState<boolean>(false);

  const increaseQuantity = (itemId: number) => {
    const copyCart = [...cartItems];
    const index = copyCart.findIndex((prod) => prod.itemId === itemId);
    copyCart[index].quantity += 1;
    copyCart[index].total = copyCart[index].price * copyCart[index].quantity;
    setCartItems(copyCart);
  };

  const decreaseQuantity = (itemId: number) => {
    const copyCart = [...cartItems];
    const index = copyCart.findIndex((prod) => prod.itemId === itemId);
    copyCart[index].quantity -= 1;
    copyCart[index].total = copyCart[index].price * copyCart[index].quantity;
    setCartItems(copyCart);
  };

  const removeItem = (itemId: number) => {
    const copyCart = [...cartItems];
    const index = copyCart.findIndex((prod) => prod.itemId === itemId);
    copyCart.splice(index, 1);
    setCartItems(copyCart);
  };

  const placeOrder = () => {
    if (authData) {
      if (codSelected) {
        const orders: IOrder[] = [...cartItems].map((items) => {
          return {
            ...items,
            userName: authData.userName,
            userEmail: authData.userEmail,
            step: "Ordered Online",
            stepCount: 1,
            time: new Date(),
          };
        });
        OrdersService.placeOrder(orders).then((res) => {
          if (res.data.success) {
            setCartItems([]);
            navigate("/");
            localStorage.setItem("products", JSON.stringify([]));
            toast.success(res.data.message, toastConfig);
          }
        });
      } else {
        toast.success("Please select payment method", toastConfig);
      }
    }
  };

  useEffect(() => {
    const copyCart = [...cartItems];
    setTotal({
      subTotal: cartSubTotal(copyCart),
      totalQuantities: cartQuantitiesTotal(copyCart),
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
    <div className="flex-grow h-full w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6 mt-20">
      <h4 className="text-2xl font-bold">
        Your Shopping Cart {cartItems.length === 0 ? "is empty." : ""}
      </h4>
      {cartItems.length > 0 && (
        <table className="w-full mt-10">
          <thead>
            <tr>
              <td className="font-bold thead">Product</td>
              <td className="font-bold thead">Item Name</td>
              <td className="font-bold thead">Price</td>
              <td className="font-bold thead">Quantity</td>
              <td className="font-bold thead">Total</td>
              <td className="font-bold thead">Remove</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={Math.random()}>
                <td className="tbody align-top">
                  <figure>
                    <img src={item.itemImage} alt="" className="w-36 h-24" />
                  </figure>
                </td>
                <td className="tbody align-top">{item.itemName}</td>
                <td className="tbody align-top">RS.{item.price}</td>
                <td className="tbody align-top">
                  <div className="flex items-center space-x-5">
                    <button
                      className="font-semibold text-xl disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled={item.quantity === 1}
                      onClick={() => decreaseQuantity(item.itemId)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="font-semibold text-xl disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled={item.quantity > 4}
                      onClick={() => increaseQuantity(item.itemId)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="tbody align-top">{item.total}</td>
                <td className="tbody align-top">
                  <button onClick={() => removeItem(item.itemId)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <div className="mt-10 flex justify-end">
          <div className="bg-primary p-4 rounded-lg w-72 flex flex-col">
            <p className="font-semibold text-xl">
              Sub Total: {total?.subTotal}
            </p>
            {authData === null && (
              <p className="font-semibold text-base mt-2">
                Almost there, login to place the order
              </p>
            )}
            {authData !== null ? (
              <>
                <div className="mt-5">
                  <input
                    type="radio"
                    name="cashOnDelivery"
                    id="cashOnDelivery"
                    onChange={() => setCodSelected(true)}
                  />
                  <label
                    htmlFor="cashOnDelivery"
                    className="ml-2 font-semibold"
                  >
                    Cash On Delivery
                  </label>
                </div>
                <button
                  className="bg-red-600 text-white font-semibold w-full px-4 py-2 rounded-lg mt-5"
                  onClick={() => placeOrder()}
                >
                  Place The Order
                </button>
              </>
            ) : (
              <Link
                to="/gettingStarted"
                className="bg-red-600 text-white font-semibold w-full px-4 py-2 rounded-lg mt-5 text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
