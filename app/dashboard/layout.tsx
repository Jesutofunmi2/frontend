import React, { ReactNode } from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/DashboardSidebar/DashboardSidebar";
import DashboardNav from "@/components/Navbar/DashboardNavbar/DashboardNavbar";
import AuthProvider from "@/Providers/authProvider";
import UserLayoutProvider from "@/Providers/userLayoutProvider";

const DashboadLayout = ({ children }:any) => {
  return (
    <>
      <AuthProvider>
        <UserLayoutProvider>
          {children}
        </UserLayoutProvider>
      </AuthProvider>
    </>
  );
};

export default DashboadLayout;
