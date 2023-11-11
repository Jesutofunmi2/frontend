import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Button from "../Button/Button";

const Footer = () => {
  return (
    <section className={styles.footerContainer}>
      <div className={styles.wrap}>
        {/* LOGO */}
        <Image
          src="/assets/images/logo.png"
          width="100"
          height="117"
          alt="logo"
        />
        {/* BRAND */}
        <div className={styles.textWrap}>
          <h2>Izesan!</h2>
          <p>Telling Africa &apos;s story one language at a time.</p>
        </div>
        {/* SERVICES */}
        <div className={styles.servicesWrap}>
          <h2>Services</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </div>
        {/* SPECIAL OFFER */}
        <div className={styles.special}>
          <h2>Sign Up for Special Offer</h2>
          <form action="">
            <input type="search" name="" id="" />
            <Button
              text="Subscribe"
              // url="/kinn"
              color="black"
             
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Footer;
