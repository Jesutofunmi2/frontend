import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Login from '@/components/Form/Forms/Login/LoginForm';
import tree from "/public/assets/images/tree.png";
import RegisterForm from "@/components/Form/Forms/Register/RegisterForm";

const Register = () => {
  return (
    <>
      <div className={styles.register}>
        <Image src={tree} className={styles.treeImg} alt="tree" />
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
