'use client'
import React, { useState } from 'react'
import Footer from '@/components/Footer/Footer'
import HomeNavbar from '@/components/Navbar/HomeNavbar/HomeNavbar'
import Image from 'next/image'
import { BsArrowRightShort } from 'react-icons/bs'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import useMediaQuery from '@/utils/hooks/useMediaQuery'

const Home = () => {
  const matches = useMediaQuery('(max-width: 640px)')
 

  const phoneImages = [
    {
      name: 'Game',
      image: '/assets/images/landingpage/phone_game.svg',
      description:
        'Dive into the world of Izesan, where learning a new language feels like an epic adventure',
    },
    {
      name: 'Animation',
      image: '/assets/images/landingpage/phone_stories.svg',
      description:
        'Watch your learning experience unfold in vivid detail with our captivating video animations.',
    },
    {
      name: 'Stories',
      image: '/assets/images/landingpage/phone_animation.svg',
      description:
        "Embark on linguistic adventures with Izesan's stories that transport you to new worlds and cultures.",
    },
  ]
  return (
    <div className="landingpage">
      <HomeNavbar />
      <main className="relative z-30">
        <section
          style={{
            backgroundImage: `url(/assets/images/landingpage/hero_background.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
            backgroundPosition: 'center',
          }}
          className="z-40 relative"
        >
          <div className="flex flex-col lg:flex-row items-center font-medium justify-between px-8 lg:px-12 pt-12 pb-36 text-white">
            <div className="basis-[40%] text-center">
              <h1 className="text-5xl">
                Welcome to <span className="7xl font-bold"> Izesan!</span>
              </h1>
              <p className="py-4 text-2xl w-full">
                Where traditon meets technology in language learning!
              </p>
              <div className="mx-auto md:ml-auto w-fit lg:w-auto">
                <div className="bg-white py-2 w-fit gap-10 my-6 px-4 rounded-2xl flex items-center justify-between">
                  <span className="text-black font-bold"> Choose from 15 languages </span>
                  <button className="py-2 px-6 bg-brown rounded-lg font-bold w-auto">
                    Join Now
                  </button>
                </div>
              </div>
              <p className="text-base pt-2">
                Embark on a transformative journey with Izesan, a pioneering e-learning platform
                designed to bring the richness of indigenous languages directly to your fingertips.
              </p>
            </div>

            <Image
              src={'/assets/images/landingpage/group.svg'}
              alt="logo"
              height={100}
              width={100}
              className="h-96 lg:h-[500px] w-auto"
            />
          </div>
        </section>

        <section className="z-30 lg:py-16 px-4 lg:px-20 h-full relative text-brown text-center ">
          <div
            style={{ zIndex: '-1' }}
            className="absolute -top-40 w-full bg-[#ffffffb0] right-0 h-[90em] overflow-hidden"
          ></div>
          <div className="text-center font-bold lg:my-4">
            {' '}
            <h2 className="text-3xl font-bold">From Second language to second nature</h2>
            <p className="text-base font-medium mx-auto lg:w-[40%] my-4">
              Izesan gets you confortable with real-life communication by tapping into your brainss
              natural ability to learn.
            </p>
          </div>

          <div className="flex flex-row flex-wrap items-center my-12 md:gap-8 lg:gap-20 text-brown justify-center">
            {phoneImages.map((ele) => {
              return (
                <div key={ele.name} className="w-64 lg:w-[20em]">
                  <Image
                    src={ele.image}
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-48 w-[30em] lg:h-auto lg:w-auto"
                  />
                  <div className="text-center">
                    <h2 className="font-bold text-xl mb-1">{ele.name}</h2>
                    <p className="text-base font-medium ">{ele.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
        <section className="relative z-40 bg-brown flex flex-col lg:flex-row lg:gap-16 items-center text-white justify-between">
          <div
            style={{
              backgroundImage: `url(/assets/images/landingpage/rounded_rectangle.svg)`,
              backgroundRepeat: 'no-repeat',
              // width: '100%',
              backgroundPosition: 'left',
            }}
            className="text-left px-8 pt-8 lg:p-12 bg-cover md:bg-contain"
          >
            <div className="md:w-[80%] ">
              <div>
                <h2 className="text-4xl font-bold lg:w-5/6 mb-3">Language learning for all</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus illo magni
                  voluptatem iste veritatis inventore, ipsam quae molestias quas! Tempora eligendi
                </p>
              </div>
              {[
                {
                  name: 'For Schools',
                  image: '/assets/images/landingpage/schools.svg',
                  subtext: 'Empowering Education Through language',
                  description:
                    'Izesan recognizes the pivotal role language plays in education. Our platform offers schools a comprehensive language curriculum designed to enhance students linguistic capabilities.',
                },
                {
                  name: 'Animation',
                  image: '/assets/images/landingpage/individual.svg',
                  subtext: 'Personalized Learning Journey',
                  description:
                    'Individuals, whether language enthusiasts or those looking to boost their career prospects, can harness the power of Izesan for personal growth. Heres what individuals can expect.',
                },
                {
                  name: 'Stories',
                  image: '/assets/images/landingpage/enterprise.svg',
                  subtext: 'Elevating Global Communication',
                  description:
                    'In a globalized business landscape, effective communication is paramount. Izesan empowers enterprises with language learning solutions tailored to professional development.',
                },
              ].map((ele) => {
                return (
                  <div
                    className="flex flex-col md:flex-row gap-8 my-12 text-2xl items-center"
                    key={ele.name}
                  >
                    <Image src={ele.image} alt="logo" height={100} width={100} className=" w-48" />
                    <div>
                      <div className="flex gap-4 mb-4 items-center">
                        {' '}
                        <h3 className="text-xl font-bold">{ele.name}</h3>{' '}
                        <span className="bg-brown rounded-full">
                          <BsArrowRightShort className="text-white" />
                        </span>
                      </div>
                      <p className="text-sm font-bold">{ele.subtext}...</p>
                      <p className="text-xs font-normal">{ele.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center lg:flex-col px-4  pt-6 lg:px-8 gap-8 md:gap-16">
            {[
              {
                image: '/assets/images/landingpage/library.svg',

                description: 'Over 40, 000  Cultural/Educational  resources.',
              },
              {
                image: '/assets/images/landingpage/government-building.svg',

                description: 'Governmental  Approved',
              },
              {
                image: '/assets/images/landingpage/location.svg',

                description: 'Millions of lerners worldwide',
              },
            ].map((ele,index) => {
              return (
                <div  key={index} className="">
                  <Image
                    src={ele.image}
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-[100px] mx-auto w-auto"
                  />
                  <p className="text-lg my-4">{ele.description}</p>
                </div>
              )
            })}
          </div>
        </section>
        <section className="my-8 relative px-4 py-8 lg:py-20 font-bold bg-white bg-gray-100">
          <h2 className="text-4xl lg:text-5xl">Our Accreditation</h2>
          <div className="flex items-center my-4 justify-center gap-6">
            <hr className="border-black w-48" />
            <span className="rounded-full bg-black p-1"></span>
            <hr className="border-black w-48" />
          </div>
          <div className="flex items-center flex-col lg:flex-row justify-center gap-10 mt-12">
            <Image
              src={'/assets/images/landingpage/national_institute.svg'}
              alt="logo"
              height={100}
              width={100}
              className="h-[100px] w-auto"
            />
            <hr className="hidden lg:block rotate-90 border-black border-2 w-20" />

            <Image
              src={'/assets/images/landingpage/national_institute.svg'}
              alt="logo"
              height={100}
              width={100}
              className="h-[100px] w-auto"
            />
          </div>
          <p className="text-lg font-bold pt-20 lg:px-20">
            At Izesan! we take pride in being your premier language learning institution, dedicated
            to providing top-notch education in collaboration with the Federal Government of Nigeria
            and the National Institute for Nigerian languages Nigerian Language Institute. With a
            commitment to excellence and a passion for linguistic diversity, we offer accredited
            language courses that empower individuals to communicate
          </p>
        </section>
        <section className="my-8 px-4 py-8 lg:py-20 bg-gray-100 text-black ">
          <h2 className="text-4xl lg:text-5xl font-bold">Our Subscribed Partners</h2>
          <div className="mx-auto my-12">
            <Carousel
              className=""
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
              showArrows
            >
              <div className="flex items-center gap-10 justify-center">
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo A</p>
                  <p className="text-lg">School A</p>
                </div>
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo B</p>
                  <p className="text-lg">School B</p>
                </div>
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo C</p>
                  <p className="text-lg">School C</p>
                </div>
              </div>
              <div className="flex items-center gap-10 justify-center">
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo D</p>
                  <p className="text-lg">School D</p>
                </div>
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo E</p>
                  <p className="text-lg">School E</p>
                </div>
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo F</p>
                  <p className="text-lg">School F</p>
                </div>
              </div>
              <div className="flex items-center gap-10 justify-center">
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo G</p>
                  <p className="text-lg">School G</p>
                </div>
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo H</p>
                  <p className="text-lg">School H</p>
                </div>
                <div className="text-center bg-white p-8 font-bold">
                  <p className="bg-primary px-8 text-sm py-2">Logo I</p>
                  <p className="text-lg">School J</p>
                </div>
              </div>
            </Carousel>
          </div>
          <div
            style={{
              backgroundImage: `url(/assets/images/landingpage/bg-people.svg)`,
              backgroundSize: 'contain',
              width: '100%',
              height: '100px',
              backgroundPosition: 'center',
            }}
          ></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
