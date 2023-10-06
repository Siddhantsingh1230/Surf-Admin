import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutAsync } from "../slices/AuthSlice";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";


const Signout = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);
  useEffect(() => {
    dispatch(signoutAsync(admin.id));
  }, []);

  return <>{admin ? <Spinner /> : <Navigate to="/" replace={true} />}</>;
}

export default Signout
