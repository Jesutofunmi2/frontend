import React from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/DashboardSidebar/DashboardSidebar";
import SchoolNavbar from "@/components/Navbar/SchoolNavbar/SchoolNavbar";
import SchoolAuthProvider from "@/Providers/schoolAuthProvider";


interface ChildrenProps {
  children: React.ReactNode
}
const DashboadLayout = ({ children }:ChildrenProps) => {
  return (
    <>
      <SchoolAuthProvider>
        <SchoolNavbar/>
        <div className={styles.layout}>
          <Sidebar school="true"/>
          <div className={styles.body}>{children}</div>
        </div>
      </SchoolAuthProvider>
    </>
  );
};

export default DashboadLayout;