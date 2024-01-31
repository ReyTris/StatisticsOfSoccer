import { FC } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <div className="h-screen bg-gray-300">
        <div className="h-full mx-auto xl:px-30">
            <Sidebar />
            <div className="">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
