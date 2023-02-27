import { Flip } from "react-toastify";
import { ToastOptions } from "react-toastify/dist/types";

const toastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  transition: Flip,
  theme: "light",
};
export default toastConfig;