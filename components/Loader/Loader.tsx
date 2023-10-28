import React from "react";
import styles from "./loader.module.css";
import turtoiseLoader from "../../public/assets/images/turtoiseLoader.gif";
import Image from "next/image";

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <Image src={turtoiseLoader} className={styles.img} alt="loader" />
    </div>
  );
};

export const Spinner = () => {
  return (
    <div className={styles.loaderWrap}>
      <span className={styles.loader}></span>
    </div>
  );
};
