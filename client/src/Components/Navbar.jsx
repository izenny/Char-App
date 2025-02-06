import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/AuthSlice"; // Import the logout action
import toast from "react-hot-toast"; // Import toast for notifications

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser()) // Dispatch logoutUser and unwrap to catch errors
    // toast.success("Logged out successfully!"); // Show success message
    // navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div className="flex p-5 justify-between items-center bg-gray-100 shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-blue-500">Logo</h2>
      </div>
      <div className="flex space-x-4 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="text-blue-600 hover:underline">
              {user?.fullname || "Profile"}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
