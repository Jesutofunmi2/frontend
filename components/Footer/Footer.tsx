import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoYoutube } from 'react-icons/io'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <section className="bg-[#262626]">
      <div className="flex  md:flex-row items-center flex-wrap p-4 md:p-8 justify-center gap-4">
        <Image
          src={'/assets/images/landingpage/google-Image.svg'}
          alt="logo"
          height={100}
          width={100}
          className="h-[50px]  md:w-auto"
        />
        <Image
          src={'/assets/images/landingpage/iphone-Image.svg'}
          alt="logo"
          height={100}
          width={100}
          className="h-[50px] md:w-auto"
        />
      </div>
      <div className="p-10 flex flex-col lg:flex-row gap-8 lg:gap-6 justify-center items-start lg:items-center text-white bg-[#333333]">
        <Image src="/assets/images/logo.png" width="50" height="50" alt="logo" />
        <div className="text-sm text-left">
          <p>&copy; {new Date().getFullYear()}</p>
          <p className='py-1'>Izesan. All right reserved.</p>
          <p>A division of Otaigbe Groups</p>
        </div>
        <hr className="border-white w-10 rotate-90 hidden lg:block" />
        <div className="text-sm text-left">
          <p>Sign up for the special offer</p>
          <div className="mt-2 text-left">
            <input
              type="email"
              placeholder="Email"
              className="border-transparent w-64 border-2 text-black rounded-lg outline-none p-2 focus-visible:border-2 focus-visible:border-solid focus-visible:border-yellow"
            />
            <button className="bg-primary rounded-lg px-6 mt-2 lg:mt-0 lg:ml-4 py-2 font-bold">
              Subscribed
            </button>
          </div>
        </div>
        <hr className="border-white rotate-90 w-10 hidden lg:block" />
        <div className="text-left">
          <Link className="block hover:text-yellow" href="/">
            Register
          </Link>
          <Link className=" block hover:text-yellow py-1" href="/login">
            Sign In
          </Link>
        </div>
        <hr className="border-white rotate-90 w-10 hidden lg:block" />
        <div className="flex gap-4 justify-center items-center ">
          {' '}
          <Link className="text-xl hover:text-yellow" href="https://www.youtube.com/@izesan392">
            <IoLogoYoutube />
          </Link>
          <Link className="text-xl  hover:text-yellow" href="https://www.instagram.com/lzesan/">
            <AiOutlineInstagram />
          </Link>
          <Link className="text-xl  hover:text-yellow" href="https://twitter.com/lzesan">
            <FaXTwitter />
          </Link>
          <Link
            className="text-xl  hover:text-yellow"
            href="https://www.facebook.com/izesanspeakesan/"
          >
            <BiLogoFacebook />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Footer
