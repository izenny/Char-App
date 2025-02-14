import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./Redux/AuthSlice";
import {
  connectSocket,
  disconnectSocket,
} from "./SocketService/SocketIoService";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";

import { Toaster } from "react-hot-toast";
import Home from "./Components/Home";
import Search from "./Components/Search";
import AudioCalls from "./Components/AudioCalls";
import VideoCalls from "./Components/VideoCalls";

const App = () => {
  const { user, isAuthenticated, isLoading, onlineUsers } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  console.log(user, isAuthenticated, isLoading, onlineUsers);
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
  }, [dispatch, user?.id]);

  return (
    <div className="w-full h-screen ">
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="call" element={<AudioCalls />} />
          <Route path="video-call" element={<VideoCalls />} />
          <Route path="settings" element={<Settings />} />
          <Route
            path="profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
