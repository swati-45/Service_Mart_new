import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/slice/authSlice";
import { clearAll } from "../utils/storage";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, token, role, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const login = () => {};

  const logout = () => {
    clearAll();
    dispatch(logoutAction());
  };

  return {
    user,
    token,
    role,
    isAuthenticated,
    login,
    logout,
  };
};

export default useAuth;