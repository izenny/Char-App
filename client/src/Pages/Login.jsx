import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/AuthSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed} from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await dispatch(loginUser(formData)).unwrap();
      // toast.success("Login Successful!");
      navigate("/");
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-96 p-8  rounded-2xl shadow-xl bg-zinc-800 dark:bg-zinc-800">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-purple-500 focus:outline-none"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`w-full transition text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
  focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg 
    font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 
  ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
       <Link to="/register" className="text-white text-center block mt-4">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default Login;
