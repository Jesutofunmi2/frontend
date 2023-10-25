"use client";

import React, { useState } from "react";
import styles from "./dashboardNavbar.module.css";
import Image from "next/image";
import { RxSpeakerLoud } from "react-icons/rx";
import { LuBellPlus } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";
import logo from "/public/assets/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MobileNavbarViewDash } from "../mobileViewMenu";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import SearchBar from "@/components/SearchBar/SearchBar";

const DashboardNav = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const language = searchParams.get("language");



  return (
    <>
      <section className={styles.dashNav}>
        
        {/* LOGO AND HAMBUGER */}
        <div className={styles.logoWrap}>
          <span className={styles.hamburger}>
            <GiHamburgerMenu onClick={() => setOpen(true)} />
          </span>
          <Link href="/">
            <Image src={logo} alt="logo" height={57} width={57} className={styles.logo}/>
          </Link>
        </div>

        {/* HEADER TEXT */}
        <p className={styles.headerText}>
          Welcome to Izesan! {language ? <span>Speak {language}!</span> : null}
        </p>

        {/* USER DETAILS AND SOUND */}
        <div className={styles.detailsAndSoundWrap}>
          <RxSpeakerLoud color="#6D98FD" className={styles.icon} />
          <LuBellPlus color="#FFC400" className={styles.icon} />
          <div className={styles.user}>
            <HiOutlineUserCircle size={35} />
            <span>{name}</span>
          </div>
        </div>

        <MobileNavbarViewDash open={open} setOpen={setOpen} />
      </section>
    </>
  );
};

export default DashboardNav;
