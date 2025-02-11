
import React from "react";
import { useSelector } from "react-redux";
import userIcon from "../assets/UserIcon.png";

const ChatHeader = () => {
  const { participants } = useSelector((state) => state.chat);
  const { user, onlineUsers } = useSelector((state) => state.auth);

  const receiver = participants?.find((u) => u._id !== user?.id);

  return (
    <div className="flex items-center gap-4 p-4 border-b bg-zinc-900 text-slate-50">
      {/* Profile Picture */}
      <img
        src={receiver?.profilePic || userIcon} 
        alt={receiver?.fullname || "User"}
        className="w-12 h-12 rounded-full object-cover border border-gray-300"
      />
      {/* User Info */}
      <div>
        <h2 className="text-lg font-semibold">
          {receiver?.fullname || "Unknown"}
        </h2>
        <p className="text-xs text-blue-700">
          {onlineUsers.includes(receiver?._id) ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
