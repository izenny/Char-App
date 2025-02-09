
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatRooms,
  fetchUsers,
  NewChat,
  setChatRoom,
  setMessages,
  setParticipants,
} from "../Redux/ChatSlice";
import userIcon from "../../public/UserIcon.png";
import { getSocket } from "../SocketService/SocketIoService";

const Home = () => {
  const [activeTab, setActiveTab] = useState("All Chats");
  const { users, isUserLoading, selectedUser, rooms } = useSelector(
    (state) => state.chat
  );
  const { onlineUsers, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const socket = getSocket();
  if (!socket) {
    console.error("❌ Socket is not connected.");
    return;
  }
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchChatRooms());
  }, [dispatch]);

  const joinRoomHandler = (room) => {
    console.log(room.room);
    dispatch(setChatRoom(room.room));
    dispatch(setParticipants(room.participants));

    socket.emit("join room", room.room);

    socket.on("oldMessage", (messages) => {
      dispatch(setMessages(messages));
    });
  };


  return (
    <div className="h-full w-full space-y-2">
      <h2>Messages</h2>

      {/* Tab Buttons */}
      <div className="flex justify-around p-1 bg-black rounded-full">
        {["All Chats", "Groups", "Contacts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm py-2 rounded-full px-3 transition-all ${
              activeTab === tab ? "bg-zinc-800 text-white" : "hover:bg-zinc-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "All Chats" && (
          <div className="overflow-y-auto w-full flex flex-col gap-2 py-3">
            {rooms.length > 0 ? (
              rooms.map((room) => {
                // Get the opposite participant (excluding logged-in user)
                const otherParticipant = room.participants.find(
                  (participant) => participant._id !== user.id
                );

                const lastMessage =
                  room.messages.length > 0 ? room.messages[0] : null;

                return (
                  <div
                    key={room._id}
                    onClick={() => joinRoomHandler(room)}
                    className="flex bg-zinc-800 items-center gap-3 p-3 cursor-pointer transition-all rounded-lg hover:bg-zinc-700 text-white"
                  >
                    
                    <img
                      src={room.roompic || otherParticipant?.profilepic || userIcon}
                      alt={otherParticipant?.fullname}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {room.roomname ||
                          otherParticipant?.fullname ||
                          "Unknown Chat"}
                      </span>
                      
                      <span className="text-xs text-gray-400">
                        {lastMessage
                          ? `${
                              lastMessage.sender === user.id
                                ? "You"
                                : room.participants.find(
                                    (p) => p._id === lastMessage.sender
                                  )?.fullname || "Unknown"
                            }: ${lastMessage.text}`
                          : "No messages yet"}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">
                No chat rooms available
              </p>
            )}
          </div>
        )}
      </div>

      {/* User List  */}
      {activeTab === "Contacts" && (
        <div className="flex-1 overflow-y-auto">
          <div className="overflow-y-auto w-full flex flex-col gap-2 py-3">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user?._id}
                  onClick={() => dispatch(NewChat(user?._id))}
                  className={`flex bg-zinc-800 items-center gap-3 p-3 cursor-pointer transition-all rounded-lg 
                        ${
                          selectedUser?._id === user?._id
                            ? "bg-zinc-700 text-white"
                            : "hover:bg-zinc-700 text-white"
                        }`}
                >
                  {/* Profile Picture */}
                  <img
                    src={user?.profilePic || userIcon}
                    alt={user?.fullname}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                  <div className="flex flex-col">
                    <span className=" ">{user?.fullname}</span>
                    <span className=" text-xs">
                      {onlineUsers.includes(user?._id) ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No users available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
