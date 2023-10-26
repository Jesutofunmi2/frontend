import React from "react";
import TeacherLayoutProvider from "@/Providers/TeacherLayoutProvider";

const TeacherDashboadLayout = ({ children }) => {
  return (
    <>
      <TeacherLayoutProvider>
        {children}
      </TeacherLayoutProvider>
    </>
  );
};

export default TeacherDashboadLayout;
