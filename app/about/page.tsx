import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import phoneDude from "/public/assets/images/phoneDude.png";
import Footer from "@/components/Footer/Footer";
import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";

const About = () => {
  return (
    <>
      <HomeNavbar  />
      <div className={styles.aboutContainer}>
        <div className={styles.textAndImgWrap}>
          <div className={styles.textWrap}>
            <h2>About Us</h2>
            <p>
              To document, digitise, and preserve the authenticity of African
              languages by providing a platform for their evolution.
            </p>
          </div>
          <div className={styles.imgWrap}>
            <Image src={phoneDude} className={styles.phoneDudeImg} alt="boy" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
