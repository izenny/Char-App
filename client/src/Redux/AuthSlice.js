import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../Lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket } from "../SocketService/SocketIoService";
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  socket: null,
  onlineUsers: [],
};

// Register User
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/login", formData);
      return response.data;

    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// OTP Verification
export const OtpVerifyUser = createAsyncThunk(
  "/auth/otpverify",
  async (otp, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:7000/api/auth/verify-email`,
        otp,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "OTP verification failed.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Authentication Check
export const authCheck = createAsyncThunk(
  "/auth/checkauth",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("auth/authcheck");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Authentication check failed.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("auth/logout");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Logout failed. Try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "/user/update_profile",
  async (formData, thunkAPI) => {
    console.log("loaded");

    try {
      const response = await axiosInstance.put("user/update_profile", formData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Profile update failed. Try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Auth Slice
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload; // ✅ Update online users list
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        // connectSocket(action.payload.user.id);  // Use dispatch here
        toast.success("Account created successfully!");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.error(action.payload);
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        // connectSocket(action.payload.user.id);  // Use dispatch here
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.error(action.payload);
      })

      // OTP Verification
      .addCase(OtpVerifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(OtpVerifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        toast.success("OTP verified successfully!");
      })
      .addCase(OtpVerifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        toast.error(action.payload);
      })

      // Authentication Check
      .addCase(authCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // connectSocket(action.payload.user.id);
        // toast.success("Authentication successful!");
      })
      .addCase(authCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
  
        toast.error(action.payload);
      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        disconnectSocket();
        state.onlineUsers = [];
        toast.success("Logged out successfully!");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      }) // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Update user data in the store
        toast.success("Profile updated successfully!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { setUser, setOnlineUsers } = AuthSlice.actions;
export default AuthSlice.reducer;
