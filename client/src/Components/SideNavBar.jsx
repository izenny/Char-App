// import { Home, Icon, PhoneCall, Search, Settings, Video } from "lucide-react";
// import React from "react";
// import { useSelector } from "react-redux";
// import { Outlet, Route } from "react-router-dom";

// const SideNavBar = () => {
//   const { user } = useSelector((state) => state.auth);
//   return (
//     <div className="w-full h-full flex gap-1 ">
//       <div className="h-full w-20 p-2 py-5 flex flex-col justify-between bg-zinc-900  text-white items-center  ">
//         <div>
//           <img src="" alt="" />
//         </div>
//         <div className="flex flex-col items-center gap-5">
//           <div  className="flex flex-col gap-1 items-center hover:text-blue-400 cursor-pointer ">
//             <Home size={30} className="" />
//             <span className="text-xs">Home</span>
//           </div>
//           <div className="flex flex-col gap-1 items-center hover:text-blue-400 cursor-pointer ">
//             <Search size={30} className="" />
//             <span className="text-xs">Search</span>
//           </div>
//           <div className="flex flex-col gap-1 items-center hover:text-blue-400 cursor-pointer ">
//             <PhoneCall size={30} className="" />
//             <span className="text-xs">Call</span>
//           </div>
//           <div className="flex flex-col gap-1 items-center hover:text-blue-400 cursor-pointer ">
//             <Video size={30} className="" />
//             <span className="text-xs">Video Call</span>
//           </div>
//           <div className="flex flex-col gap-1 items-center hover:text-blue-400 cursor-pointer ">
//             <Settings size={30} className="" />
//             <span className="text-xs">Settings</span>
//           </div>
//         </div>
//         <div>
//           <img
//             src={user.profilePic || "/default-avatar.png"} // Fallback image
//             alt={user.fullname}
//             className="w-12 h-12 rounded-full object-cover border border-gray-300"
//           />
//         </div>
//       </div>
//       <div className="h-full w-72 bg-zinc-900 ">
//         <Outlet/>
//       </div>
//     </div>
//   );
// };

// export default SideNavBar;

// import { Home, PhoneCall, Search, Settings, Video } from "lucide-react";
// import React from "react";
// import { useSelector } from "react-redux";
// import { NavLink, Outlet } from "react-router-dom";
// // import icon from "../assets/UserIcon.png";
// // import userIcon from "../assets/UserIcon.png";
// import NochatSelected from "./NochatSelected";
// import ChatContainer from "./ChatContainer";
// const SideNavBar = () => {
//   const { user } = useSelector((state) => state.auth) || {};
//   const { room } = useSelector((state) => state.chat) || {};

//   return (
//     <div className="w-full h-full flex gap-1">
//       {/* Sidebar Navigation */}
//       <div className="h-full w-20 p-2 py-8 flex flex-col justify-between bg-zinc-900 text-white items-center">
//         <div>
//           {/* <img src={icon} alt="" className="w-8 h-8  object-cover " /> */}
//         </div>
//         {/* Navigation Links */}
//         <div className="flex flex-col items-center gap-5">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `flex flex-col gap-1 items-center cursor-pointer ${
//                 isActive ? "text-blue-400" : "hover:text-blue-400"
//               }`
//             }
//           >
//             <Home size={26} />
//             <span className="text-xs">Home</span>
//           </NavLink>
//           <NavLink
//             to="/search"
//             className={({ isActive }) =>
//               `flex flex-col gap-1 items-center cursor-pointer ${
//                 isActive ? "text-blue-400" : "hover:text-blue-400"
//               }`
//             }
//           >
//             <Search size={26} />
//             <span className="text-xs">Search</span>
//           </NavLink>
//           <NavLink
//             to="/call"
//             className={({ isActive }) =>
//               `flex flex-col gap-1 items-center cursor-pointer ${
//                 isActive ? "text-blue-400" : "hover:text-blue-400"
//               }`
//             }
//           >
//             <PhoneCall size={26} />
//             <span className="text-xs">Call</span>
//           </NavLink>
//           <NavLink
//             to="/video-call"
//             className={({ isActive }) =>
//               `flex flex-col gap-1 items-center cursor-pointer ${
//                 isActive ? "text-blue-400" : "hover:text-blue-400"
//               }`
//             }
//           >
//             <Video size={26} />
//             <span className="text-xs">Video Call</span>
//           </NavLink>
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               `flex flex-col gap-1 items-center cursor-pointer ${
//                 isActive ? "text-blue-400" : "hover:text-blue-400"
//               }`
//             }
//           >
//             <Settings size={26} />
//             <span className="text-xs">Settings</span>
//           </NavLink>
//         </div>
//         {/* Profile Picture */}
//         {/* <NavLink to="/profile">
//           <img
//             src={user?.profilePic || userIcon}
//             alt={user?.fullname}
//             className="w-12 h-12 rounded-full object-cover border border-gray-300 bg-slate-800"
//           />
//         </NavLink> */}
//       </div>

//       {/* Main Content */}
//       <div className="h-full w-72 bg-zinc-900 p-4 text-white">
//         <Outlet />
//       </div>
//       {room ? <ChatContainer /> : <NochatSelected />}
//     </div>
//   );
// };

// export default SideNavBar;

import React from 'react'

const SideNavBar = () => {
  return (
    <div>SideNavBar</div>
  )
}

export default SideNavBar