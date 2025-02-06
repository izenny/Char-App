import React from 'react'
import { useSelector } from 'react-redux';

const ChatHeader = () => {
    const { selectedUser } = useSelector(
        (state) => state.chat
      );
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white">
      {/* Profile Picture */}
      <img
        src={selectedUser.profilePic || "/default-avatar.png"} // Fallback image
        alt={selectedUser.fullname}
        className="w-12 h-12 rounded-full object-cover border border-gray-300"
      />
      {/* User Info */}
      <div>
        <h2 className="text-lg font-semibold">{selectedUser.fullname}</h2>
        <p className="text-sm text-gray-500">Online</p>
      </div>
    </div>
  )
}

export default ChatHeader