import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoYoutube } from 'react-icons/io'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'

const Footer = () => {
  return (
    <section className="bg-[#262626]">
      <div className="flex flex-col md:flex-row items-center flex-wrap p-4 md:p-8 justify-center gap-4">
        <Image
          src={'/assets/images/landingpage/google-Image.svg'}
          alt="logo"
          height={100}
          width={100}
          className="h-[50px] w-auto"
        />
        <Image
          src={'/assets/images/landingpage/iphone-Image.svg'}
          alt="logo"
          height={100}
          width={100}
          className="h-[50px] w-auto"
        />
      </div>
      <div className="p-10 flex flex-col lg:flex-row gap-8 lg:gap-6 justify-center items-start lg:items-center text-white bg-[#333333]">
        <Image src="/assets/images/logo.png" width="50" height="50" alt="logo" />
        <div className='text-sm text-left'>
          <p>2016-2023</p>
          <p>Izesan. All right reserved.</p>
          <p>A division of Otaigbe Groups</p>
        </div>
        <hr className="border-white w-10 rotate-90 hidden lg:block" />
        <div className='text-sm text-left'>
          <p >Sign up for the special offer</p>
          <div className="mt-2 text-left">
            <input type="email" placeholder="email" className="border-none rounded-lg py-2 px-6" />
            <button className="bg-primary rounded-lg px-6 mt-2 lg:mt-0 lg:ml-4 py-2 font-bold">Subscribed</button>
          </div>
        </div>
        <hr className="border-white rotate-90 w-10 hidden lg:block" />
        <div className='text-left'>
          <Link className=" block " href="/">Register</Link>
          <Link  className=" block " href="/">Sign In</Link>
        </div>
        <hr className="border-white rotate-90 w-10 hidden lg:block" />
      <div className='flex gap-4 justify-center  items-center '>  <Link className="text-xl" href="#"><IoLogoYoutube/></Link>
        <Link className="text-xl" href="#"><AiOutlineInstagram/></Link>
        <Link className="text-xl" href="#"><AiOutlineTwitter/></Link>
        <Link className="text-xl" href="#"><BiLogoFacebook/></Link></div>
      </div>
    </section>
  )
}

export default Footer
