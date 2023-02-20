import { useContext, useEffect } from "react";
import { CartContext, CartTotalContext } from "../core/context";
import { IProducts } from "../shared/models/food.model";
import cartQuantitiesTotal from "../shared/utils/cartQuantitiesTotal";
import cartSubTotal from "../shared/utils/cartSubTotal";

const HomePage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { total, setTotal } = useContext(CartTotalContext);
  // const { cartSubTotal } = useContext(CartSubTotalContext);

  const products: IProducts[] = [
    {
      itemImage: "image",
      itemName: "Chicken Biryani",
      price: 60,
      quantity: 2,
      orderId: "123abc",
      total: 60 * 2,
    },
    {
      itemImage: "image",
      itemName: "Chicken Tikka Masala",
      price: 80 * 1,
      quantity: 1,
      orderId: "123def",
      total: 80 * 1,
    },
  ];

  const addToCart = (product: IProducts) => {
    const existingIndex = cartItems.findIndex(
      (prod) => prod.orderId === product.orderId
    );
    if (existingIndex === -1) {
      setCartItems((prev) => {
        return [...prev, product];
      });
    } else {
      const copyCart = [...cartItems];
      copyCart[existingIndex].quantity += 1;
      copyCart[existingIndex].total =
        copyCart[existingIndex].price * copyCart[existingIndex].quantity;
      setCartItems(copyCart);
    }
  };

  const deleteItem = (orderId: string) => {
    const copyCart = [...cartItems];
    const index = copyCart.findIndex((prod) => prod.orderId === orderId);
    copyCart.splice(index, 1);
    setCartItems(copyCart);
  };

  useEffect(() => {
    console.log(cartItems, "run");
    const copyCart = [...cartItems];
    setTotal({
      totalQuantities: cartQuantitiesTotal(copyCart),
      subTotal: cartSubTotal(copyCart),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div className="space-y-5 mt-6 p-5">
      {cartItems &&
        cartItems.length > 0 &&
        cartItems.map((item) => (
          <div key={Math.random()} className="space-y-2">
            <p>image: {item.itemImage}</p>
            <p>name: {item.itemName}</p>
            <p>price: {item.price}</p>
            <p>quantity: {item.quantity}</p>
            <p>order id:{item.orderId}</p>
            <p>total:{item.total}</p>
            <button onClick={() => deleteItem(item.orderId)}>delete</button>
          </div>
        ))}
      <p>Total: {total?.totalQuantities}</p>
      <p>Sub Total: {total?.subTotal}</p>
      <button
        onClick={() => {
          const randomNumber: number = Math.floor(Math.random() * 2);
          addToCart(products[randomNumber]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default HomePage;
