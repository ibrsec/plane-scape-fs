import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toastWarn } from "../helpers/toastify";
import { useEffect } from "react";

const PrivateRouter = () => {
  const accessToken = useSelector((state) => state.auth.accessToken); 
  //check if the access token is exist, if it is not exist then user is not loginned ann he cant go tot the login needed pages or features
  useEffect(() => {
    if (!accessToken) {
      toastWarn("You must Login first!");
    }
  }, [accessToken]);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
