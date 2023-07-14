import "./notification.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (msg, type) => {
  switch (type) {
    case "S":
      return toast.success("Success! " + msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    case "E":
      return toast.error("Error! " + msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    case "W":
      return toast.warning("Warning! " + msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
  }
};
const Notification = () => {
  return <ToastContainer />;
};

export { Notification, notify };
