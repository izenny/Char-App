// import React, { useEffect } from "react";
// import Navbar from "./Components/Navbar";
// import { Navigate, Route, Routes } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
// import Register from "./Pages/Register";
// import Login from "./Pages/Login";
// import Settings from "./Pages/Settings";
// import Profile from "./Pages/Profile";
// import { useDispatch, useSelector } from "react-redux";
// import { authCheck } from "./Redux/AuthSlice";
// import { Loader } from "lucide-react";
// import { Toaster } from "react-hot-toast";
// const App = () => {
//   const { user, isAuthenticated, isLoading ,onlineUsers} = useSelector(
//     (state) => state?.auth
//   );
//   console.log(user, isAuthenticated, isLoading,onlineUsers);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(authCheck());
//   }, [dispatch]);
// // 2.43
//   // if (isLoading && !user)
//   //   return (
//   //     <div className="flex justify-center items-center h-screen">
//   //       <Loader className="size-10 animate-spin" />
//   //     </div>
//   //   );
//   return (
//     <div className="w-full h-screen justify-center items-center">
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <HomePage /> : <Navigate to={"/login"} />}
//         />
//         <Route
//           path="/register"
//           element={!isAuthenticated ? <Register /> : <Navigate to={"/"} />}
//         />
//         <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={"/"}/>} />
//         <Route path="/settings" element={<Settings />} />
//         <Route
//           path="/profile"
//           element={isAuthenticated ? <Profile /> : <Navigate to={"/login"} />}
//         />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./Redux/AuthSlice";
import { connectSocket, disconnectSocket } from "./SocketService/SocketIoService";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user, isAuthenticated, isLoading,onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(user, isAuthenticated, isLoading,onlineUsers);
  useEffect(() => {
    dispatch(authCheck());

    let socket;
    if (user && isAuthenticated) {
      socket = connectSocket(user.id, dispatch);
    }

    return () => {
      if (socket) {
        disconnectSocket();
      }
    };
  }, [dispatch,user?.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
