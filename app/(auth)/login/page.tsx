"use client"

import React, { useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import LoginForm from "@/components/Form/Forms/Login/Login";
import tree from "/public/assets/images/tree.png";
import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const MyLogin = () => {
  const token = false
  const router = useRouter();
  useEffect(() => {
   if (token) {
    router.back()
   }
  }, [token, router])

  return (
    <>
      <HomeNavbar noFixedNavbar={true} />
      <div className={styles.login}>
        <div className={styles.log}>
          <Image src={tree} className={styles.tree} alt="tree" />
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default MyLogin;
