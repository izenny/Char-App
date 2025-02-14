import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logoutUser()); // Dispatch logoutUser and unwrap to catch errors
  };
  return (
    <div className="flex flex-col items-center justify-end h-full">
      <button
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
