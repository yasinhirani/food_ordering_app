import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartTotalContext } from "../core/context";

const Navbar = () => {
  const { total } = useContext(CartTotalContext);
  return (
    <div className="bg-primary h-20 fixed top-0 w-full z-20">
      <div className="w-full h-full max-w-baseWidth mx-auto px-6 md:px-12 py-4 flex justify-between items-center space-x-5">
        <div className="italic bg-red-500 w-10 h-10 rounded-full text-white flex justify-center items-center">
          <Link to="/">FOA</Link>
        </div>
        {/* <div>
          <ul className="flex items-center space-x-6 text-sm font-medium">
            <li><Link to="/" className="px-2">Home</Link></li>
            <li><Link to="/" className="px-2">Menu</Link></li>
            <li><Link to="/" className="px-2">Service</Link></li>
          </ul>
        </div> */}
        <div className="flex items-center space-x-5">
          <div className="relative">
            <Link to="/cart">
              <figure className="w-8">
                <img src="/images/cart.png" alt="" />
              </figure>
            </Link>
            <p className="bg-red-500 text-white absolute w-5 h-5 rounded-full text-sm flex justify-center items-center -top-2 -right-2">
              {total?.totalQuantities ? total.totalQuantities : 0}
            </p>
          </div>
          <p>user</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
