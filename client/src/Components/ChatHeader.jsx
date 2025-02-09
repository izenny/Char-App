
import React from "react";
import { useSelector } from "react-redux";
import userIcon from "../../public/UserIcon.png";

const ChatHeader = () => {
  const { participants } = useSelector((state) => state.chat);
  const { user, onlineUsers } = useSelector((state) => state.auth);

  const receiver = participants?.find((u) => u._id !== user.id);

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white">
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
        <p className="text-sm text-gray-500">
          {onlineUsers.includes(receiver?._id) ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
