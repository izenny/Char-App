import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser } from "../Redux/ChatSlice";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { users, isUserLoading, selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Show skeleton while loading
  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <div className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all rounded-lg 
                ${selectedUser === user._id ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            >
              {/* Profile Picture */}
              <img
                src={user.profilePic || "/default-avatar.png"} // Fallback image
                alt={user.fullname}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <span className="hidden lg:block">{user.fullname}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users available</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
