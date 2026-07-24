import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { clearToast } from "../store/slice/uiSlice";

const GlobalToast = () => {
  const { toastMessage } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toastMessage) {
      if (toastMessage.type === "error") {
        toast.error(toastMessage.message);
      } else if (toastMessage.type === "success") {
        toast.success(toastMessage.message);
      } else {
        toast(toastMessage.message);
      }

      // Clear the message to avoid duplicate toasts on re-renders
      setTimeout(() => {
        dispatch(clearToast());
      }, 100);
    }
  }, [toastMessage, dispatch]);

  return null;
};

export default GlobalToast;
