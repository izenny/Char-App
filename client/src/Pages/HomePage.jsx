import React from "react";

import SideNavBar from "../Components/SideNavBar";

const HomePage = () => {
  return (
    <div className="h-screen ">
      <div className="flex items-center  justify-center pt-20 px-4">
        <div className="bg-zinc-800 dark:bg-zinc-800 shadow-xl rounded-xl w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideNavBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
