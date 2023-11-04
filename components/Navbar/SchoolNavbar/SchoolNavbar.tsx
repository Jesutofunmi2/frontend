"use client";

import React, { useState } from "react";
import styles from "./schoolNavbar.module.css";
import Image from "next/image";
import { RxSpeakerLoud } from "react-icons/rx";
import { LuBellPlus } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";
import logo from "/public/assets/images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MobileNavbarViewDash } from "../mobileViewMenu";
import { useSelector } from "react-redux";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import { userData } from "@/services/redux/features/userSlice";
// import SearchBar from "@/components/SearchBar/SearchBar";

const SchoolNavbar = () => {
  const [open, setOpen] = useState(false);
  const name = useSelector(userData).currentUser?.data?.name!
  // const name = useSelector((state) => state?.user?.currentUser?.data?.name);
  // console.log(name);

  return (
    <>
      <section className={styles.dashNav}>
        {/* LOGO AND HAMBUGER */}
        <div className={styles.logoWrap}>
          <span className={styles.hamburger}>
            <GiHamburgerMenu onClick={() => setOpen(true)} />
          </span>
          <Link href="/">
            <Image src={logo} alt="logo" height={57} width={57}/>
          </Link>
        </div>

        {/* HEADER TEXT */}
        <p className={styles.headerText}>
          Welcome <span>{name}</span>
        </p>

        {/* search */}
        {/* <SearchBar/> */}
        <div></div>

        {/* WHEN SCREEN IS REDUCED TO MOBILE VIEW */}
        <MobileNavbarViewDash open={open} setOpen={setOpen} />
      </section>
    </>
  );
};

export default SchoolNavbar;
