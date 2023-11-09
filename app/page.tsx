import React from 'react'
import styles from './page.module.css'
import Hero from '@/components/Hero/Hero'
import CloudMenu from '@/components/clouds/cloudMenus/CloudMenu'
import Mission from '@/components/mission/Mission'
import CloudTitle from '@/components/clouds/cloudTitle/CloudTitle'
import OurPrograms from '@/components/OurPrograms/OurPrograms'
import StatsCloud from '@/components/clouds/statsCloud/statsCloud'
import LeaderBoard from '@/components/LeaderBoard/LeaderBoard'
import BookTutor from '@/components/BookTutor/BookTutor'
import Footer from '@/components/Footer/Footer'
import HomeNavbar from '@/components/Navbar/HomeNavbar/HomeNavbar'
import Image from 'next/image'
import { BsArrowRightCircleFill, BsArrowRightShort } from 'react-icons/bs'

const Home = () => {
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
      <main>
        <section
          style={{
            backgroundImage: `url(/assets/images/landingpage/hero_background.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // height: '90vh',
            width: '100%',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex items-center font-medium justify-between p-12 text-white">
            <div className="basis-[40%]">
              <h1 className="text-5xl">
                Welcome to <span className="7xl font-bold"> Izesan!</span>
              </h1>
              <p className="py-4 text-2xl w-96">
                Where traditon meets technology in language learning!
              </p>
              <div className="bg-white py-2 w-fit gap-10 my-6 px-4 rounded-2xl flex items-center justify-between">
                <span className="text-black font-bold"> Choose from 15 languages </span>
                <button className="py-2 px-6 bg-brown rounded-lg font-bold w-auto">Join Now</button>
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
              className="h-[450px] w-auto"
            />
          </div>
        </section>

        <section className="py-16 px-20 text-brown text-center ">
          <div className=" 2-40 text-center font-bold my-4">
            {' '}
            <h2 className="text-3xl font-bold ">From Second language to second nature</h2>
            <p className="text-base font-medium mx-auto w-[40%] my-4">
              Izesan gets you confortable with real-life communication by tapping into your brainss
              natural ability to learn.
            </p>
          </div>

          <div className="flex items-center my-12 gap-20 text-brown justify-between">
            {phoneImages.map((ele) => {
              return (
                <div key={ele.name}>
                  <Image
                    src={ele.image}
                    alt="logo"
                    height={100}
                    width={100}
                    className="h-auto w-auto"
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
        <section className="bg-brown flex gap-16 items-center text-white ">
          <div
            style={{
              backgroundImage: `url(/assets/images/landingpage/rounded_rectangle.svg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              width: '100%',
              backgroundPosition: 'left',
            }}
            className="text-left p-12"
          >
            <div className="w-[60%]">
              <div className="w-[80%]">
                <h2 className="text-4xl font-bold w-3/6 mb-3">Language learning for all</h2>
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
                  <div className="flex gap-8 my-12 text-2xl items-center" key={ele.name}>
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
          <div className=""></div>
        </section>
        <section className="my-20 text-black">
          <h2 className="text-5xl">Our Accreditation</h2>
          <div className="flex items-center my-4 justify-center gap-6">
            <hr className="border-black w-48" />
            <span className="rounded-full bg-black p-1"></span>
            <hr className="border-black w-48" />
          </div>
          <p className="text-xl font-bold p-20">
            At Izesan! we take pride in being your premier language learning institution, dedicated
            to providing top-notch education in collaboration with the Federal Government of Nigeria
            and the National Institute for Nigerian languages Nigerian Language Institute. With a
            commitment to excellence and a passion for linguistic diversity, we offer accredited
            language courses that empower individuals to communicate
          </p>
        </section>
        <section className="my-20 text-black">
          <h2 className="text-5xl">Our Subscribed Partners</h2>
          <div className="flex items-center my-4 justify-center gap-6">
            <hr className="border-black w-48" />
            <span className="rounded-full bg-black p-1"></span>
            <hr className="border-black w-48" />
          </div>
          <p className="text-xl font-bold p-20">
            At Izesan! we take pride in being your premier language learning institution, dedicated
            to providing top-notch education in collaboration with the Federal Government of Nigeria
            and the National Institute for Nigerian languages Nigerian Language Institute. With a
            commitment to excellence and a passion for linguistic diversity, we offer accredited
            language courses that empower individuals to communicate
          </p>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Home
