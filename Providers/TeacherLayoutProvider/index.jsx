"use client"

import React from "react";
import Sidebar from "@/components/Sidebar/DashboardSidebar/DashboardSidebar";
import AuthProvider from "@/Providers/authProvider";
import SchoolNavbar from "@/components/Navbar/SchoolNavbar/SchoolNavbar";
import { BaselineFormTeacher } from "@/components/Form/Forms/BaselineForm/BaselineForm";
import { useSelector } from "react-redux";
import NetworkStrengthDetector from "@/components/NetworkStrength";

const TeacherLayoutProvider = ({ children }) => {
  const surveyStatus = useSelector((state) => state?.user?.currentTeacher?.data?.survey_status);
  const surveyFormStatus = useSelector((state) => state?.survey?.status);
  return (
    <>
      {/* <AuthProvider> */}
      {/* <NetworkStrengthDetector/> */}
        <SchoolNavbar/>
        <div className="layout">
          <Sidebar teacher="true"/>
          <div className="main">{children}</div>
        </div>
      {/* </AuthProvider> */}
      {surveyStatus === false && surveyFormStatus === false ?<BaselineFormTeacher/>: null}
    </>
  );
};

export default TeacherLayoutProvider;