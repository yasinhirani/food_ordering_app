import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../core/context";
import { IUserOrdersDetail } from "../shared/models/orders.model";
import OrdersService from "../shared/services/orders.service";

const MyOrders = () => {
  const { authData } = useContext(AuthContext);

  const [userOrders, setUserOrders] = useState<IUserOrdersDetail[]>([]);

  const getUserOrders = () => {
    if (authData) {
      OrdersService.getAllUserOrders(authData?.userEmail).then((res) => {
        setUserOrders(res.data.orders);
      });
    }
  };

  useEffect(() => {
    getUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);
  return (
    <div className="flex-grow h-full mt-20">
      <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6">
        <div className="flex justify-between items-center space-x-5">
          <h2 className="font-bold text-3xl">Your Orders</h2>
          {userOrders.length > 0 && (
            <button
              type="button"
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
              onClick={() => getUserOrders()}
            >
              Refresh
            </button>
          )}
        </div>
        <div className="flex flex-col space-y-5 mt-6">
          {userOrders &&
            userOrders.map((orders) => {
              return (
                <div
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0"
                  key={Math.random()}
                >
                  <figure>
                    <img
                      src={orders.itemImage}
                      alt=""
                      className="w-full h-auto sm:w-60 sm:h-52 lg:w-44 lg:h-32 rounded-lg"
                    />
                  </figure>
                  <div>
                    <h4 className="font-semibold">{orders.itemName}</h4>
                    <p className="text-sm mt-2 font-medium">
                      quantity: {orders.quantity}
                    </p>
                    <div className="grid user-order-grid gap-8 justify-start mt-6">
                      <div
                        className={`flex flex-col items-center space-y-2 ${
                          orders.stepCount >= 1
                            ? "opacity-100 font-medium"
                            : "opacity-50 cursor-not-allowed"
                        } ${orders.stepCount === 1 ? "animate-pulse" : ""}`}
                      >
                        <figure>
                          <img
                            className="w-8"
                            src="/images/step_1.png"
                            alt=""
                          />
                        </figure>
                        {orders.stepCount > 1 ? (
                          <figure>
                            <img
                              className="w-4"
                              src="/images/check.png"
                              alt=""
                            />
                          </figure>
                        ) : (
                          <p className="text-xs font-semibold">
                            Ordered Online
                          </p>
                        )}
                      </div>
                      <div
                        className={`flex flex-col items-center space-y-2 ${
                          orders.stepCount >= 2
                            ? "opacity-100 font-medium"
                            : "opacity-50 cursor-not-allowed"
                        } ${orders.stepCount === 2 ? "animate-pulse" : ""}`}
                      >
                        <figure>
                          <img
                            className="w-8"
                            src="/images/step_2.png"
                            alt=""
                          />
                        </figure>
                        {orders.stepCount > 2 ? (
                          <figure>
                            <img
                              className="w-4"
                              src="/images/check.png"
                              alt=""
                            />
                          </figure>
                        ) : (
                          <p className="text-xs font-semibold">
                            Ordered Preparation
                          </p>
                        )}
                      </div>
                      <div
                        className={`flex flex-col items-center space-y-2 ${
                          orders.stepCount >= 3
                            ? "opacity-100 font-medium"
                            : "opacity-50 cursor-not-allowed"
                        } ${orders.stepCount === 3 ? "animate-pulse" : ""}`}
                      >
                        <figure>
                          <img
                            className="w-8"
                            src="/images/step_3.png"
                            alt=""
                          />
                        </figure>
                        {orders.stepCount > 3 ? (
                          <figure>
                            <img
                              className="w-4"
                              src="/images/check.png"
                              alt=""
                            />
                          </figure>
                        ) : (
                          <p className="text-xs font-semibold">
                            Ready for pickup
                          </p>
                        )}
                      </div>
                      <div
                        className={`flex flex-col items-center space-y-2 ${
                          orders.stepCount === 4
                            ? "opacity-100 font-medium"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <figure>
                          <img
                            className="w-8"
                            src="/images/step_4.png"
                            alt=""
                          />
                        </figure>
                        {orders.stepCount === 4 ? (
                          <figure>
                            <img
                              className="w-4"
                              src="/images/check.png"
                              alt=""
                            />
                          </figure>
                        ) : (
                          <p className="text-xs font-semibold">
                            Order handover
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {userOrders.length === 0 && (
            <p className="font-semibold text-2xl mt-5">
              You haven't order anything yet...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
