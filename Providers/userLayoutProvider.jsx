"use client";

import React from "react";
import DashboardNav from "@/components/Navbar/DashboardNavbar/DashboardNavbar";
import Sidebar from "@/components/Sidebar/DashboardSidebar/DashboardSidebar";
import { usePathname } from "next/navigation";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UserLayoutProvider = ({ children }) => {
  const pathname = usePathname();
  const isOnUserPage = pathname === "/dashboard";
 
  // CSS STYLES
  const style = {
    layout: {
      display: "flex",
    },
    body: {
      flex: "8",
      backgroundColor: "whitesmoke",
      padding: "25px 30px",
      boxSizing: "border-box",
      overflow: "hidden",
      borderRadius: "20px",
    },
  };

  return (
    <>
      {isOnUserPage ? null : <DashboardNav />}
      <div style={isOnUserPage ? null : style.layout}>
        {isOnUserPage ? null : <Sidebar />}
        <div style={isOnUserPage ? null : style.body}>{children}</div>
      </div>
     
      <ToastContainer />
    </>
  );
};

export default UserLayoutProvider;
