import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Login from "@/components/Form/Forms/Login/Login";
import tree from "/public/assets/images/tree.png";
import Register from "@/components/Form/Forms/Register/Register";

const MyRegister = () => {
  return (
    <>
      <div className={styles.register}>
        <Image src={tree} className={styles.treeImg} alt="tree" />
        <Register />
      </div>
    </>
  );
};

export default MyRegister;
