"use client"

import React, { useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import LoginForm from '@/components/Form/Forms/Login/LoginForm';
import tree from "/public/assets/images/tree.png";
import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";
import { useRouter } from "next/navigation";


const MyLogin = () => {
  const token = false
  // const token = useSelector((state) => state?.user?.currentUser?.token?.token)
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
