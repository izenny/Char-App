
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar";
import NochatSelected from "../Components/NochatSelected";
import ChatContainer from "../Components/ChatContainer";
import SideNavBar from "../Components/SideNavBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  return (
    <div className="h-screen ">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-slate-200 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideNavBar />
            
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
