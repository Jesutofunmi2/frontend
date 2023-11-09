import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <section className="bg-black">
      <div></div>
      <div className="p-8 flex gap-4 items-center text-white">
        <Image src="/assets/images/logo.png" width="100" height="117" alt="logo" />
        <div>
          <p>2016-2023</p>
          <p>Izesan. All right reserved.</p>
          <p>A division of Otaigbe Groups</p>
        </div>
        <hr className="border-white w-20 rotate-90" />
        <div>
          <p>Sign up for the special offer</p>
          <div className="mt-3">
            <input type="email" placeholder="email" className="border-none rounded-lg p-4" />
            <button className="bg-primary rounded-lg px-6  ml-4 py-4 font-bold">Subscribed</button>
          </div>
        </div>
        <hr className="border-white rotate-90 w-20" />
        <div></div>
      </div>
    </section>
  )
}

export default Footer
