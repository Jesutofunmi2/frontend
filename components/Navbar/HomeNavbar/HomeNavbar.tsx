'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { usePathname } from 'next/navigation'
import useMediaQuery from '@/utils/hooks/useMediaQuery'
import { MdClose } from 'react-icons/md'


const HomeNavbar = () => {
  const pathname = usePathname()
  const matches = useMediaQuery('(max-width: 640px)')
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    // { name: 'Izesan For Schools', link: '/izesan_for_schools' },
  ]
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-2 bg-white">
        <Link href="/">
          <Image src="/assets/images/logo.png" height={57} width={57} alt="logo" />
        </Link>
        {!matches ? (
          <div className="flex gap-10 items-center">
            {navLinks.map((ele) => {
              return (
                <Link
                  key={ele.name}
                  href={ele.link}
                  className={`
                    ${pathname === ele.link
                      ? 'border-b-2 border-secondary '
                      : 'border-b-2 border-white' } hover:text-yellow` 
                  }
                >
                  {ele.name}
                </Link>
              )
            })}
            <Link href="/login" className="rounded-lg font-bold px-6 py-2 bg-brown text-white hover:bg-yellow">
              Login
            </Link>
          </div>
        ) : (
          <button onClick={() => setOpenMobileMenu(true)}>
            <GiHamburgerMenu className="text-3xl text-brown hover:text-yellow" />
          </button>
        )}
      </nav>
      {openMobileMenu ? (
        <nav className="shadow-2xl h-full fixed bg-white w-[90%] z-40 top-0 right-0  pl-12 pr-6 py-2 bg-white">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image src="/assets/images/logo.png" height={57} width={57} alt="logo" />
            </Link>
            <button onClick={() => setOpenMobileMenu(false)}>
              {' '}
              <MdClose className="text-3xl text-brown hover:text-yellow" />
            </button>
          </div>

          <div className="flex gap-6  mt-8 flex-col items-start">
            {navLinks.map((ele) => {
              return (
                <Link
                  key={ele.name}
                  href={ele.link}
                  className={
                    pathname === ele.link
                      ? 'border-b-2 border-secondary '
                      : 'border-b-2 border-white'
                  }
                >
                  {ele.name}
                </Link>
              )
            })}
            <Link href="/login" className="rounded-lg font-bold px-6 py-2 bg-brown text-white">
              Login
            </Link>
          </div>
        </nav>
      ) : null}
    </>
  )
}

export default HomeNavbar
