// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../Redux/AuthSlice";
// import { toast } from "react-hot-toast";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//   });

//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     if (!formData.fullname.trim()) {
//       toast.error("Full Name is required");
//       return false;
//     }
//     if (!formData.email.trim()) {
//       toast.error("Email is required");
//       return false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       toast.error("Invalid email format");
//       return false;
//     }
//     if (!formData.password.trim()) {
//       toast.error("Password is required");
//       return false;
//     } else if (formData.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       dispatch(registerUser(formData));
//       toast.success("Registration successful!");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-96 p-8 border rounded-2xl shadow-lg bg-white">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-2 font-medium">Full Name</label>
//             <input
//               type="text"
//               name="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               // required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               // required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 // required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-500 focus:outline-none"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../Redux/AuthSlice";
import { toast } from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.fullname.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(registerUser(formData));
      toast.success("Registration successful!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-96 p-8 rounded-2xl shadow-xl bg-zinc-800 dark:bg-zinc-800">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-white">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-purple-500 focus:outline-none"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full transition text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
            focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Register
          </button>
        </form>
        <Link to="/login" className="text-white text-center block mt-4">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
