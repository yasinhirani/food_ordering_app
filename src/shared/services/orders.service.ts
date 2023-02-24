import { privateAxios } from "../../core/services/core.service";
import {
  IAddOrdersRes,
  IAllOrdersRes,
  IOrder,
  IUpdateStep,
  IUpdateStepRes,
  IUserOrdersRes,
} from "../models/orders.model";

const getAllOrders = (): Promise<IAllOrdersRes> => {
  return privateAxios.get("/getAllOrders");
};

const getAllUserOrders = (email: string): Promise<IUserOrdersRes> => {
  return privateAxios.post("/getUserOrders", {
    userEmail: email,
  });
};

const placeOrder = (items: IOrder[]): Promise<IAddOrdersRes> => {
  return privateAxios.post("/addOrders", {
    items: items,
  });
};

const updateStep = (values: IUpdateStep): Promise<IUpdateStepRes> => {
  return privateAxios.post("/updateStep", values);
};

const OrdersService = {
  getAllOrders,
  getAllUserOrders,
  placeOrder,
  updateStep,
};

export default OrdersService;
