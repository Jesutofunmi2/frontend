'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './schoolNavbar.module.css'
import Image from 'next/image'
import logo from '/public/assets/images/logo.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MobileNavbarViewDash } from '../mobileViewMenu'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'

const SchoolNavbar = () => {
  const [open, setOpen] = useState(false)
  const name = useSelector(userData).currentUser?.data?.name!

  return (
    <>
      <section className={styles.dashNav}>
        {/* LOGO AND HAMBUGER */}
        <div className={styles.logoWrap}>
          <span className={styles.hamburger}>
            <GiHamburgerMenu onClick={() => setOpen(true)} />
          </span>
          <Link href="/">
            <Image src={logo} alt="logo" height={57} width={57} />
          </Link>
        </div>

        <p className={styles.headerText}>
          Welcome <span>{name}</span>
        </p>

        {/* WHEN SCREEN IS REDUCED TO MOBILE VIEW */}
        <MobileNavbarViewDash open={open} setOpen={setOpen} />
      </section>
    </>
  )
}

export default SchoolNavbar
