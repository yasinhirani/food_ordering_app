import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, CartTotalContext } from "../core/context";

const Navbar = () => {
  const { total } = useContext(CartTotalContext);
  const { authData } = useContext(AuthContext);
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
        <div className="flex items-center space-x-8">
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
          <div>
            {authData !== null ? (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex w-full justify-center items-center rounded-md text-lg focus:outline-none">
                    <div className="flex items-center space-x-2">
                      <figure className="w-8">
                        <img src="/images/user.png" alt="" />
                      </figure>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute flex flex-col right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* <Menu.Item>
                      <p className="border-b px-3 py-2">{authData}</p>
                    </Menu.Item> */}
                    <Menu.Item>
                      <Link
                        to="/myOrders"
                        className="w-full text-left px-3 py-2"
                      >
                        My Orders
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        to="/cart"
                        className="w-full text-left px-3 py-2"
                      >
                        My Cart
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="w-full text-left px-3 py-2"
                        type="button"
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button className="font-semibold">Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
