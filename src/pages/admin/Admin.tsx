import { useEffect, useState } from "react";
import { IAllOrders, IUpdateStep } from "../../shared/models/orders.model";
import OrdersService from "../../shared/services/orders.service";

const Admin = () => {
  const [allOrders, setAllOrders] = useState<IAllOrders[]>([]);

  const getAllOrders = () => {
    OrdersService.getAllOrders().then((res) => {
      setAllOrders(res.data);
    });
  };

  const updateStep = (values: IUpdateStep) => {
    if (values.stepCount === 1) {
      OrdersService.updateStep({
        userEmail: values.userEmail,
        orderId: values.orderId,
        step: "Order Preparation",
        stepCount: 2,
      }).then(() => getAllOrders());
    }
    if (values.stepCount === 2) {
      OrdersService.updateStep({
        userEmail: values.userEmail,
        orderId: values.orderId,
        step: "Ready for pickup",
        stepCount: 3,
      }).then(() => getAllOrders());
    }
    if (values.stepCount === 3) {
      OrdersService.updateStep({
        userEmail: values.userEmail,
        orderId: values.orderId,
        step: "Order hand over",
        stepCount: 4,
      }).then(() => getAllOrders());
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="flex-grow h-full mt-20">
      <div className="w-full max-w-baseWidth mx-auto px-6 md:px-12 py-6">
        <h2>Admin Section</h2>
        <table className="w-full mt-10 border border-collapse">
          <thead>
            <tr className="border">
              <td className="font-bold thead">Name</td>
              <td className="font-bold thead">Email</td>
              <td className="font-bold thead">Product</td>
              <td className="font-bold thead">Item Name</td>
              <td className="font-bold thead">Quantity</td>
              <td className="font-bold thead">Total</td>
              <td className="font-bold thead">Step</td>
              <td className="font-bold thead">Step Count</td>
              <td className="font-bold thead">Next</td>
            </tr>
          </thead>
          <tbody>
            {allOrders &&
              allOrders.map((item) => (
                <tr key={Math.random()} className="border">
                  <td className="tbody">
                    <figure>
                      <img src={item.itemImage} alt="" className="w-36 h-24" />
                    </figure>
                  </td>
                  <td className="tbody">{item.userName}</td>
                  <td className="tbody">{item.userEmail}</td>
                  <td className="tbody">{item.itemName}</td>
                  <td className="tbody">{item.quantity}</td>
                  <td className="tbody">{item.total}</td>
                  <td className="tbody">{item.step}</td>
                  <td className="tbody">{item.stepCount}</td>
                  <td className="tbody">
                    <button
                      className="disabled:cursor-not-allowed disabled:opacity-60 bg-red-600 text-white px-4 py-2 rounded-lg"
                      disabled={item.stepCount === 4}
                      onClick={() =>
                        updateStep({
                          userEmail: item.userEmail,
                          orderId: item.orderId,
                          step: item.step,
                          stepCount: item.stepCount,
                        })
                      }
                    >
                      Next Step
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
