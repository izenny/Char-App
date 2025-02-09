import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logoutUser()); // Dispatch logoutUser and unwrap to catch errors
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Settings;
