import axios from "axios";
import {
  IAddOrdersRes,
  IAllOrdersRes,
  IOrder,
  IUpdateStep,
  IUpdateStepRes,
  IUserOrdersRes,
} from "../models/orders.model";

const getAllOrders = (): Promise<IAllOrdersRes> => {
  return axios.get("http://localhost:8080/getAllOrders");
};

const getAllUserOrders = (email: string): Promise<IUserOrdersRes> => {
  return axios.post("http://localhost:8080/getUserOrders", {
    userEmail: email,
  });
};

const placeOrder = (items: IOrder[], email: string): Promise<IAddOrdersRes> => {
  return axios.post("http://localhost:8080/addOrders", {
    items: items,
    userEmail: email,
  });
};

const updateStep = (values: IUpdateStep): Promise<IUpdateStepRes> => {
  return axios.post("http://localhost:8080/updateStep", values);
};

const OrdersService = {
  getAllOrders,
  getAllUserOrders,
  placeOrder,
  updateStep,
};

export default OrdersService;
