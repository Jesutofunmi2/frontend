import React from "react";
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
