'use client'
import React from 'react'
import Footer from '@/components/Footer/Footer'
import HomeNavbar from '@/components/Navbar/HomeNavbar/HomeNavbar'
import useMediaQuery from '@/utils/hooks/useMediaQuery'

const About = () => {
  const matches = useMediaQuery('(min-width: 1024px)')
  return (
    <>
      <HomeNavbar />
      <div>
        <div className="py-8 px-8 lg:px-16">
          <h1 className="text-4xl lg:text-5xl font-bold">Who we are</h1>
          <div className="block md:flex items-start text-xl text-black leading-loose justify-between my-8 gap-12 text-justify">
            <div className="lg:w-[45%]">
              <p>
                We believe that every language is a living entity, pulsating with the heartbeat of
                culture, and our platform serves as a bridge between the timeless wisdom of
                tradition and the boundless possibilities of technology
              </p>
            </div>
            <div className="lg:w-[45%]">
              <p>
                Join us on this journey where each word is a brushstroke, each keystroke a note, and
                each language a masterpiece in the making. Izesan! : where the past whispers to the
                future, and every digital chapter adds a layer to the epic tale of linguistic
                evolution.
              </p>
            </div>
          </div>
        </div>
        <hr className="border-yellow border-2" />
        <div className="py-8 px-8 lg:px-16 flex flex-wrap items-center my-8 justify-between">
          <div
            className="rounded-full border-[14px] border-brown border-solid w-64 h-64 md:h-96 md:w-96 mx-auto scale-20"
            style={{
              backgroundImage: `url(/assets/images/about/ceo_image.svg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="my-6 md:my-0 text-center md:text-left lg:w-[45%]">
            <h3 className="text-4xl mb-6 font-bold">The CEO</h3>

            <p className="text-xl text-black leading-loose text-justify">
              Anthony Otaigbe founded the Izesan! app In 2019 for the Esan people of Nigeria both
              within the country and in the diaspora. The platform has since grown to become the
              go-to learning application for languages like Hausa, Igbo, Yoruba, Ibibio, Esan, Tiv
              and more. From 2020 onwards, under Anthony&apos;s leadership, Izesan! has expanded its
              offering to over 300 courses in 20+ African languages.
            </p>
            <p className="text-xl text-black leading-loose text-justify">
              In 2023, the Federal Ministry of Education and the National Institute for Nigerian
              Languages (NINLAN) endorsed Izesan! and became official partners in digitising
              Nigerian languages.{' '}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
