import React, { ReactNode } from "react";
import TeacherLayoutProvider from "@/Providers/TeacherLayoutProvider";

const TeacherDashboadLayout = ({ children }:any) => {
  return (
    <>
      <TeacherLayoutProvider>
        {children}
      </TeacherLayoutProvider>
    </>
  );
};

export default TeacherDashboadLayout;
