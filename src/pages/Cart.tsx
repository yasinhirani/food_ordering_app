import { useContext } from "react";
import { CartContext, CartTotalContext } from "../core/context";
import cartQuantitiesTotal from "../shared/utils/cartQuantitiesTotal";
import cartSubTotal from "../shared/utils/cartSubTotal";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { total, setTotal } = useContext(CartTotalContext);

  const increaseQuantity = (itemId: number) => {
    const copyCart = [...cartItems];
    const index = copyCart.findIndex((prod) => prod.itemId === itemId);
    copyCart[index].quantity += 1;
    copyCart[index].total = copyCart[index].price * copyCart[index].quantity;
    setCartItems(copyCart);
    setTotal({
      subTotal: cartSubTotal(copyCart),
      totalQuantities: cartQuantitiesTotal(copyCart),
    });
  };

  const decreaseQuantity = (itemId: number) => {
    const copyCart = [...cartItems];
    const index = copyCart.findIndex((prod) => prod.itemId === itemId);
    copyCart[index].quantity -= 1;
    copyCart[index].total = copyCart[index].price * copyCart[index].quantity;
    setCartItems(copyCart);
    setTotal({
      subTotal: cartSubTotal(copyCart),
      totalQuantities: cartQuantitiesTotal(copyCart),
    });
  };

  const removeItem = (itemId: number) => {
    const copyCart = [...cartItems];
    const index = copyCart.findIndex((prod) => prod.itemId === itemId);
    copyCart.splice(index, 1);
    setCartItems(copyCart);
    setTotal({
      subTotal: cartSubTotal(copyCart),
      totalQuantities: cartQuantitiesTotal(copyCart),
    });
  };

  return (
    <div className="flex-grow h-full w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6 mt-20">
      <h4 className="text-2xl font-bold">Your Shopping Cart</h4>
      {cartItems.length === 0 && (
        <h5 className="text-xl font-bold mt-10">Your Shopping Cart is empty</h5>
      )}
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
                      className="font-semibold text-xl"
                      onClick={() => increaseQuantity(item.itemId)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="tbody align-top">{item.total}</td>
                <td className="tbody align-top">
                  <button onClick={() => removeItem(item.itemId)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <div className="mt-10 flex justify-end">
          <div className="bg-primary p-4 rounded-lg w-72">
            <p className="font-semibold text-xl">
              Sub Total: {total?.subTotal}
            </p>
            <button className="bg-red-600 text-white font-semibold w-full px-4 py-2 rounded-lg mt-5">
              Pay and Place The Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
