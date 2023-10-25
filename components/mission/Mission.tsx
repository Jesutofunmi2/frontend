import React from "react";
import styles from "./mission.module.css";
import Image from "next/image";
import tribe from "/public/assets/images/theTribe.png";
import bird from "/public/assets/images/flyBird.gif";
import Marquee from "react-fast-marquee";

const Mission = () => {
  return (
    <section className={styles.missionContainer}>
      <Marquee direction="right" delay={0} speed={100} play={true} loop={0} className={styles.marquee}>
        <Image src={bird} className={styles.birdImage} alt="bird"/>
      </Marquee>
      <div className={styles.textAndImgWrap}>
        <div className={styles.textWrap}>
          <h2>Our Mission</h2>
          <p>
            To document, digitize, and preserve the authenticity of African
            languages by providing a platform for their evolution.
          </p>
        </div>
        <div className={styles.imgWrap}>
          <Image src={tribe} className={styles.tribeImage} alt="animal tribe"/>
        </div>
      </div>
    </section>
  );
};

export default Mission;
