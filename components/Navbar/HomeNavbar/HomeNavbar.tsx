'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './homeNavbar.module.css'
import Button from '../../Button/Button'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MobileNavbarViewHome } from '../mobileViewMenu'
import { usePathname } from 'next/navigation'

interface Props {
  noFixedNavbar?: boolean
}
const HomeNavbar = ({ noFixedNavbar }: Props) => {
  const token = false
  const [colorChange, setColorchange] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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

  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Izesan For Schools', link: '/izesan_for_schools' },
  ]
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-2 bg-white">
        <Link href="/">
          <Image src="/assets/images/logo.png" height={57} width={57} alt="logo" />
        </Link>
        <div className="flex gap-10 items-center">
          {navLinks.map((ele) => {
            return (
              <Link
                key={ele.name}
                href={ele.link}
                className={
                  pathname === ele.link ? 'border-b-2 border-secondary ' : 'border-b-2 border-white'
                }
              >
                {ele.name}
              </Link>
            )
          })}
          <Link href="/login" className="rounded-lg px-6 py-2 bg-brown text-white">
            Login
          </Link>
        </div>
      </nav>
    </>
  )
}

export default HomeNavbar
