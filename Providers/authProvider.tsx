"use client";
import { getToken } from "@/services/api/token";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface ChildrenProps {
  children: React.ReactNode
}
const AuthProvider = ({ children }:ChildrenProps) => {
  const [auth, setAuth] = useState(false)
  const token = getToken()
  const router = useRouter();

  useEffect(() => {
   
  if (!token) {
    router.push("/login")
  } else{
    setAuth(true)
  }

  }, [router, token])
  
  return <><span>{auth ? children : null}</span></>;
};

export default AuthProvider;
