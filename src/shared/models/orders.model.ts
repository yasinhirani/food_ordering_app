import { IBase } from "../../core/models/core.model";
import { IProducts } from "./food.model";

export interface IAllOrders {
  orderId: string;
  userName: string;
  userEmail: string;
  itemName: string;
  itemImage: string;
  quantity: number;
  total: number;
  step: string;
  stepCount: number;
}

export interface IUserOrdersDetail {
  orderId: string;
  itemName: string;
  itemImage: string;
  quantity: number;
  step: string;
  stepCount: number;
}
export interface IUserOrders {
  orders: IUserOrdersDetail[];
}

export interface IOrder extends IProducts {
  userName: string;
  userEmail: string;
  step: string;
  stepCount: number;
  time: Date;
}

export interface IUpdateStep {
  orderId: string;
  step: string;
  stepCount: number;
  userEmail: string;
}

export interface IAllOrdersRes extends IBase<IAllOrders[]> {}
export interface IUserOrdersRes extends IBase<IUserOrders> {}
export interface IAddOrdersRes
  extends IBase<{ success: boolean; message: string }> {}
export interface IUpdateStepRes extends IBase<{}> {}
