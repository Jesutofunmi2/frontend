"use client";

import React from "react";
import DashboardNav from "@/components/Navbar/DashboardNavbar/DashboardNavbar";
import Sidebar from "@/components/Sidebar/DashboardSidebar/DashboardSidebar";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaselineFormStudent } from "@/components/Form/Forms/BaselineForm/BaselineForm";
import { useSelector } from "react-redux";

const UserLayoutProvider = ({ children }) => {
  const pathname = usePathname();
  const isOnUserPage = pathname === "/dashboard";
  const surveyStatus = useSelector((state) => state?.user?.currentUser?.data?.survey_status);
  const surveyFormStatus = useSelector((state) => state?.survey?.status);

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
     {surveyStatus === false && surveyFormStatus === false ?  <BaselineFormStudent/> : null}
      <ToastContainer />
    </>
  );
};

export default UserLayoutProvider;
