'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './homeNavbar.module.css'
import Button from '../../Button/Button'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MobileNavbarViewHome } from '../mobileViewMenu'
// import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

interface Props {
  noFixedNavbar?: boolean
}
const HomeNavbar = ({ noFixedNavbar }: Props) => {
  // const token = useSelector((state) => console.log(state))
  const token = false
  const [colorChange, setColorchange] = useState(false)
  const [open, setOpen] = useState(false)
  // const pathname = usePathname()

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true)
    } else {
      setColorchange(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor)
  }, [])

  return (
    <>
      {noFixedNavbar ? (
        <nav className={styles.nofixedNav}>
          <div className={styles.container}>
            <Link href="/">
              <Image src="/assets/images/logo.png" height={57} width={57} alt="logo" />
            </Link>

            {token ? (
              <Link href="/dashboard/languages" className={styles.loginBtn}>
                <Button text="Dashboard" maxWidth="200px" width="100%" />
              </Link>
            ) : (
              <Link
                href="/login"
                style={{ maxWidth: '200px', width: '100%' }}
                className={styles.loginBtn}
              >
                <Button text="Login" maxWidth="200px" />
              </Link>
            )}

            <GiHamburgerMenu
              size={30}
              color="white"
              onClick={() => setOpen(true)}
              className={styles.hamburger}
            />

            {/* WHEN SCREEN IS REDUCED TO MOBILE VIEW */}
            <MobileNavbarViewHome open={open} setOpen={setOpen} />
          </div>
        </nav>
      ) : (
        <nav className={colorChange ? styles.active : styles.nav}>
          <div className={styles.container}>
            <Image src="/assets/images/logo.png" width="70" height="70" alt="logo" />

            {token ? (
              <Link href="/dashboard/languages" className={styles.loginBtn}>
                <Button text="Dashboard" maxWidth="200px" width="100%" />
              </Link>
            ) : (
              <Link
                href="/login"
                style={{ maxWidth: '200px', width: '100%' }}
                className={styles.loginBtn}
              >
                <Button text="Login" maxWidth="200px" />
              </Link>
            )}

            <GiHamburgerMenu
              size={30}
              color="white"
              onClick={() => setOpen(true)}
              className={styles.hamburger}
            />

            {/* WHEN SCREEN IS REDUCED TO MOBILE VIEW */}
            <MobileNavbarViewHome open={open} setOpen={setOpen} />
          </div>
        </nav>
      )}
    </>
  )
}

export default HomeNavbar
