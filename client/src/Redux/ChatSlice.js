import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../Lib/axios";

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("user/users"); // Update with actual API endpoint
      //   console.log(response.data);

      return response.data;
    } catch (error) {
      toast.error("Failed to fetch users");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

// Async thunk to fetch messages
export const fetchMessages = createAsyncThunk(
  "messages/fetch",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`messages/${id}`); // Correct API endpoint
      console.log(response.data);

      return response.data;
    } catch (error) {
      toast.error("Failed to fetch messages");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

// Async thunk to send messages
export const sendMessage = createAsyncThunk(
  "messages/send",
  async ({ id, content }, thunkAPI) => {
    console.log(id, content);

    try {
      const response = await axiosInstance.post(`messages/send/${id}`, content);
      return response.data; // Assuming the server returns the sent message
    } catch (error) {
      toast.error("Failed to send message");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

// Chat slice
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isUserLoading = false;
      })

      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })

      // Send Message
      .addCase(sendMessage.pending, (state) => {
        // Optional: You can set a loading state for sending message
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // Add the new sent message to the messages array
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state,action) => {
        // Handle any error states if needed
        toast.error(action.payload);
      });
  },
});

export const { setSelectedUser, setMessages } = ChatSlice.actions;
export default ChatSlice.reducer;
