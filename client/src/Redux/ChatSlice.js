// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
// import { axiosInstance } from "../Lib/axios";

// const initialState = {
//   messages: [],
//   users: [],
//   selectedUser: null,
//   isUserLoading: false,
//   isMessagesLoading: false,
//   room: null,
//   participants: null,
//   rooms: []
// };

// // Async thunk to fetch users
// export const fetchUsers = createAsyncThunk(
//   "users/fetch",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get("user/users"); // Update with actual API endpoint
//       //   console.log(response.data);

//       return response.data;
//     } catch (error) {
//       toast.error("Failed to fetch users");
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );

// // Async thunk to fetch messages
// export const fetchMessages = createAsyncThunk(
//   "messages/fetch",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(`messages/${id}`); // Correct API endpoint
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       toast.error("Failed to fetch messages");
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );

// // Async thunk to send messages
// export const sendMessage = createAsyncThunk(
//   "messages/send",
//   async ({ id, content }, thunkAPI) => {
//     console.log(id, content);

//     try {
//       const response = await axiosInstance.post(`messages/send/${id}`, content);
//       return response.data; // Assuming the server returns the sent message
//     } catch (error) {
//       toast.error("Failed to send message");
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );

// // new chat creating room and fetching old messages
// export const NewChat = createAsyncThunk(
//   "chat/newchat",
//   async (receiverId, thunkAPI) => {
//     try {
//       console.log("idd", receiverId);

//       const response = await axiosInstance.post(`chat/newchat/${receiverId}`);
//       console.log("newchat", response.data);

//       return response.data;
//     } catch (error) {
//       toast.error("Failed to load message");
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );

// //fetch chat rooms
// export const fetchChatRooms = createAsyncThunk(
//   "messages/fetch",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(`chat/rooms`); // Correct API endpoint
//       console.log("chat rooms",response.data);
//       return response.data;
//     } catch (error) {
//       toast.error("Failed to fetch chat rooms");
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );
// // Chat slice
// const ChatSlice = createSlice({
//   name: "chat",
//   initialState,
//   reducers: {
//     setSelectedUser: (state, action) => {
//       state.selectedUser = action.payload;
//     },
//     setMessages: (state, action) => {
//       state.messages = action.payload;
//     },
//     addMessage: (state, action) => {
//       state.messages = [...state.messages, action.payload]; // ✅ Append new message
//     },
//     addChat: (state, action) => {
//       state.chats = [...state.chats, action.payload]; // ✅ Append new message
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Users
//       .addCase(fetchUsers.pending, (state) => {
//         state.isUserLoading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.isUserLoading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state) => {
//         state.isUserLoading = false;
//       })
//       // Fetch Messages
//       .addCase(fetchMessages.pending, (state) => {
//         state.isMessagesLoading = true;
//       })
//       .addCase(fetchMessages.fulfilled, (state, action) => {
//         state.isMessagesLoading = false;
//         state.messages = action.payload;
//       })
//       .addCase(fetchMessages.rejected, (state) => {
//         state.isMessagesLoading = false;
//       })

//       // Send Message
//       .addCase(sendMessage.pending, (state) => {
//         // Optional: You can set a loading state for sending message
//       })
//       .addCase(sendMessage.fulfilled, (state, action) => {
//         // Add the new sent message to the messages array
//         state.messages.push(action.payload);
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         // Handle any error states if needed
//         toast.error(action.payload);
//       })
//       //chat controller codes
//       .addCase(NewChat.pending, (state) => {
//         state.isMessagesLoading = true;
//       })
//       .addCase(NewChat.fulfilled, (state, action) => {
//         state.isMessagesLoading = false;
//         state.messages = action.payload.messages;
//         state.room = action.payload.room;
//         state.participants = action.payload.participants;
//       })
//       .addCase(NewChat.rejected, (state, action) => {
//         state.isMessagesLoading = false;
//         toast.error(action.payload);
//       });
//   },
// });

// export const { setSelectedUser, setMessages, addMessage } = ChatSlice.actions;
// export default ChatSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../Lib/axios";

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  room: null,
  participants: null,
  rooms: [],
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("user/users"); // Update with actual API endpoint
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

// Create new chat room and fetch old messages
export const NewChat = createAsyncThunk(
  "chat/newChat",
  async (receiverId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`chat/newchat/${receiverId}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to create new chat");
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

// Fetch chat rooms
export const fetchChatRooms = createAsyncThunk(
  "chat/fetchRooms",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("chat/rooms"); // Correct API endpoint
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch chat rooms");
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
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addChatRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    setChatRoom: (state, action) => {
      state.room = action.payload;
    },
    setParticipants: (state, action) => {
      state.participants = action.payload;
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
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        toast.error(action.payload);
      })

      // Create New Chat
      .addCase(NewChat.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(NewChat.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload.messages;
        state.room = action.payload.room;
        state.participants = action.payload.participants;
        // state.rooms.push(action.payload);

      })
      .addCase(NewChat.rejected, (state, action) => {
        state.isMessagesLoading = false;
        toast.error(action.payload);
      })

      // Fetch Chat Rooms
      .addCase(fetchChatRooms.pending, (state) => {
        // state.isMessagesLoading = true;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.rooms = action.payload; // Store fetched chat rooms
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.isMessagesLoading = false;
        toast.error(action.payload);
      });
  },
});

export const {
  setSelectedUser,
  setMessages,
  addMessage,
  addChatRoom,
  setChatRoom,
  setParticipants,
} = ChatSlice.actions;
export default ChatSlice.reducer;
