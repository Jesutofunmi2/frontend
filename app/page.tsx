'use client'
import React, { useState } from 'react'
import Footer from '@/components/Footer/Footer'
import HomeNavbar from '@/components/Navbar/HomeNavbar/HomeNavbar'
import Image from 'next/image'
import { BsArrowRightShort } from 'react-icons/bs'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Link from 'next/link'
import { phoneImages, schoolLogo } from '@/utils/constants/data'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import useMediaQuery from '@/utils/hooks/useMediaQuery'

const Home = () => {
  const matches = useMediaQuery('(max-width: 700px)')
  const matchesImages = useMediaQuery('(max-width: 1096px)')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nexthandler = () => {
    if (currentImageIndex === schoolLogo.length) {
      setCurrentImageIndex(0)
    } else {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const previoushandler = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(0)
    } else {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const handleChange = (selectedIndex: number) => {
    if (selectedIndex == schoolLogo.length - 8) {
      setCurrentImageIndex(0)
    }
  }

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
            <div className="basis-[40%] text-left">
              <h1 className="text-5xl">
                Welcome to <span className="7xl font-bold"> Izesan!</span>
              </h1>
              <p className="py-4 text-xl w-full font-bold">
                Where tradition meets technology in language learning!
              </p>
              <div className="mx-auto md:ml-auto w-fit lg:w-auto">
                <div className="bg-white py-2 w-fit gap-10 my-6 px-4 rounded-2xl flex items-center justify-between">
                  <span className="text-black font-bold"> Choose from 15 languages </span>
                  <Link
                    href="/login"
                    className="py-2 px-6 bg-brown rounded-lg font-bold hover:bg-yellow w-auto"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
              <p className="text-lg pt-2">
                Embark on a transformative journey with <strong>Izesan!</strong> , a pioneering
                e-learning platform designed to bring the richness of indigenous languages directly
                to your fingertips.
              </p>
            </div>
            <Image
              src={'/assets/images/landingpage/map-updated.svg'}
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
          <div className="text-center font-bold text-brown-500 lg:my-4">
            {' '}
            <h2 className="text-3xl font-bold">From second language to second nature</h2>
            <p className="text-lg mx-auto lg:w-[50%] my-4 font-bold">
              Izesan! gets you comfortable with real-life communication by tapping into your
              brain&apos;s natural ability to learn.
            </p>
          </div>

          <div className="flex relative flex-row flex-wrap items-center my-12 md:gap-8 lg:gap-20 text-brown-500 font-bold justify-center">
            <Image
              src="/assets/images/landingpage/quote_icon_start.svg"
              alt="logo"
              height={100}
              width={100}
              className="hidden lg:block h-28 w-28 absolute bottom-52 left-48"
            />
            {phoneImages.map((ele) => {
              return (
                <div key={ele.name} className="w-64 lg:w-[20em]">
                  <Image
                    src={ele.image}
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-48 w-[30em] lg:h-56 lg:w-auto"
                  />
                  <div className="text-center">
                    <h2 className="text-2xl mb-1">{ele.name}</h2>
                    <p className="text-base">{ele.description}</p>
                  </div>
                </div>
              )
            })}
            <Image
              src="/assets/images/landingpage/quote_icon_end.svg"
              alt="logo"
              height={100}
              width={100}
              className="hidden lg:block h-28 w-28 absolute top-0 right-48"
            />
          </div>
        </section>
        <section className="relative z-40 bg-brown flex flex-col lg:flex-row lg:gap-0 items-center text-white justify-between">
          <div
            style={{
              backgroundImage: `url(/assets/images/landingpage/rounded_rectangle.svg)`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left',
            }}
            className={` ${
              matchesImages ? 'bg-cover' : 'bg-contain'
            } text-left px-8 pt-8 lg:px-16 lg:py-20`}
          >
            <div className={useMediaQuery('(max-width: 1100px)')?"w-full":"w-5/6"}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold lg:w-3/6 leading-normal mb-3">
                  Language learning for all
                </h2>
                <p className="text-justify mt-6">
                  At<strong> Izesan!</strong> we stand on the pillars of heritage, authenticity, and
                  progress. Our commitment to preserving African languages goes beyond rhetoric;
                  it&apos;s a dedication to empowering communities through linguistic preservation.
                </p>
              </div>
              {[
                {
                  name: 'For Schools',
                  image: '/assets/images/landingpage/school.svg',
                  subtext: 'Empowering education through language',
                  description:
                    'Our platform offers schools comprehensive language learning resources designed to fit seamlessly into any and every school’s curriculum.',
                },
                {
                  name: 'Animation',
                  image: '/assets/images/landingpage/animation.svg',
                  subtext: 'Personalized learning journey',
                  description:
                    'Individuals, whether language enthusiasts or those looking to boost their career prospects, can harness the power of Izesan! for personal growth.',
                },
                {
                  name: 'Stories',
                  image: '/assets/images/landingpage/enterprise-image.svg',
                  subtext: 'Elevating Global communication',
                  description:
                    'In a globalized business landscape, effective communication is paramount. Izesan! empowers enterprises with language learning solutions tailored to professional development.',
                },
              ].map((ele) => {
                return (
                  <div
                    className="flex flex-col md:flex-row md:gap-8 my-12 text-2xl items-center"
                    key={ele.name}
                  >
                    <Image src={ele.image} alt="logo" height={100} width={100} className=" w-64" />
                    <div>
                      <div className="flex gap-4 my-4 lg:my-0 items-center">
                        {' '}
                        <h3 className="text-[1.4rem] font-bold">{ele.name}</h3>{' '}
                        <span className="bg-brown-500 rounded-full">
                          <BsArrowRightShort className="text-white text-base" />
                        </span>
                      </div>
                      <p className="text-[17px] font-bold">{ele.subtext}...</p>
                      <p className="text-base text-justify">{ele.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center lg:flex-col px-4 pt-6 lg:pr-16 lg:pl-8 gap-8 md:gap-16">
            {[
              {
                image: '/assets/images/landingpage/library.svg',
                description: 'Over 40,000 Cultural/Educational resources',
              },
              {
                image: '/assets/images/landingpage/government-building.svg',
                description: 'Government Approved',
              },
              {
                image: '/assets/images/landingpage/location.svg',
                description: 'Millions of learners worldwide',
              },
            ].map((ele, index) => {
              return (
                <div key={index} className="text-center">
                  <Image
                    src={ele.image}
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-20 w-auto mx-auto"
                  />
                  <p className="text-base md:text-lg font-bold my-4">{ele.description}</p>
                </div>
              )
            })}
          </div>
        </section>
        <section className="my-8 relative px-8 lg:px-12 py-8 lg:py-20 font-bold bg-white bg-gray-100">
          <Image
            src="/assets/images/landingpage/quote_icon_start.svg"
            alt="logo"
            height={100}
            width={100}
            className="hidden lg:block h-30 w-30 absolute top-0 left-0"
          />
          <h2 className="text-4xl lg:text-[2.3rem]">Our Partners</h2>
          <div className="flex items-center my-4 justify-center gap-10">
            <hr className="border-black w-36" />
            <span className="rounded-full bg-black p-1"></span>
            <hr className="border-black w-36" />
          </div>
          <div className="flex items-center flex-col gap-4 lg:gap-8 md:flex-row flex-wrap justify-center  mt-12">
            {[
              '/assets/images/landingpage/federal_ministry_logo.svg',
              '/assets/images/landingpage/nigerian_institute_logo.svg',
              '/assets/images/landingpage/universal_basic_education.svg',
            ].map((ele, index) => {
              return (
                <div key={index}>
                  <Image
                    src={ele}
                    alt="logo"
                    height={100}
                    width={100}
                    className="w-[20em] h-[80px] lg:w-auto"
                  />
                </div>
              )
            })}
          </div>
          <p className="text-justify md:text-center text-lg font-bold pt-8 md:pt-20 lg:px-20">
            At Izesan! we take pride in being your premier language learning institution, dedicated
            to providing top-notch education in collaboration with the Federal Ministry of
            Education, the National Institute for Nigerian languages, and the Universal Basic
            Education Commission.
          </p>
          <Image
            src="/assets/images/landingpage/quote_icon_bottom.svg"
            alt="logo"
            height={100}
            width={100}
            className="hidden lg:block h-20 md:h-30 w-30 absolute bottom-0 md:bottom-10 right-0"
          />
        </section>
        <section className="my-8 px-4 py-8 lg:py-20 bg-white text-black ">
          <h2 className="text-4xl lg:text-[2.3rem] font-bold">Our Subscribers</h2>
          <div className="mx-auto my-12 w-[90%] lg:w-5/6 flex items-center justify-center">
            <button className="" onClick={() => previoushandler()}>
              <BiSolidLeftArrow className="text-brown text-2xl md:text-3xl" />
            </button>
            <div className="w-5/6 mx-auto">
              <Carousel
                selectedItem={currentImageIndex}
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                infiniteLoop={true}
                autoPlay
                centerMode={matches ? false : true}
                centerSlidePercentage={matches ? 0 : 30}
                onChange={handleChange}
              >
                {schoolLogo.map((ele: string, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundImage: `url(${ele})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        width: '100%',
                        height: '120px',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                  )
                })}
              </Carousel>
            </div>
            <button className="" onClick={() => nexthandler()}>
              <BiSolidRightArrow className="text-brown text-2xl md:text-3xl" />
            </button>
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
