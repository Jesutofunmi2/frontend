import React from "react";
import styles from "./hero.module.css";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Button from "../Button/Button";
import theGang from "/public/assets/images/friendsPhone.png";
import appleBadge from "/public/assets/images/appleBadge.png";
import googleBadge from "/public/assets/images/googleBadge.png";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });



const Hero = () => {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.textWrap}>
          <h1>We&apos;re telling Africa&apos;s story one language at a time</h1>

          <p>
            Izesan! is an e-learning platform for African languages that offers
            interactive lessons and exercises to teach users how to speak
            different African languages.
          </p>
          <Link href="/about">
            <Button
              text="About us"
              backgroundColor="white"
              color="black"
              
            />
          </Link>

          <div className={styles.appWrap}>
            <Image
              src={appleBadge}
              alt="apple badeg phone"
              className={styles.badge}
            />
            <Image
              src={googleBadge}
              alt="google phone"
              className={styles.badge}
            />
          </div>
        </div>

        <div className={styles.imgWrap}>
          <Image src={theGang} alt="phone" className={styles.theGang} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
