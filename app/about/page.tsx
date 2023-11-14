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
        <div className="py-8 px-8 lg:px-12">
          <h1 className="text-4xl lg:text-6xl font-bold">Who we are</h1>
          <div className="block md:flex  items-start text-lg text-black leading-loose justify-between mt-8 gap-12 text-justify">
            <div className="lg:w-1/2">
              <p>
                Never in the history of our continent has there been a dire need to fill the
                widening gap with regard to speaking African languages as there is now. While
                embracing the dividends of &apos;civilisation&apos;, the utility of African
                languages and cultures has witnessed a downward spiral in the last century. African
                languages come with their own unique beauty but have remained limited in their
                study. The solution? lzesan!, Izesan! is an e-Learning platform for African
                languages. The platform offers interactive lessons, flashcards, and exercises to
                teach users how to speak diverse African languages.
              </p>
            </div>
            <div className="lg:w-1/2">
              <p>
                The app is constantly being updated to include a curriculum that doesn&apos;t just
                teach users the language but immerses them in the culture and teaches them the
                lifestyle and uniqueness of the African continent. It also engages learners by
                testing their language skills and providing real-world African communication skills
                using short, illustrated lessons, online tutors, and lyric music videos as they
                acquire a new language skill set. Based in Nigeria&apos;s capital city, Abuja,
                lzesan! has over twenty-thousand (20,000) learners across iOS and Android platforms.{' '}
              </p>
            </div>
          </div>
          {matches ? (
            <div className="my-20">
              <div className="flex flex-wrap items-center justify-center mt-4 gap-4 lg:gap-6">
                {['Yoru\u0300ba\u0301', 'Esan', 'Igbo', 'Hausa', 'IsiZulu', 'Twi', 'Swahili'].map(
                  (ele, index) => {
                    return (
                      <div
                        key={index}
                        className={`bg-yellow px-6 py-3 text-lg font-bold text-white rounded-lg text-center w-36`}
                      >
                        {ele}
                      </div>
                    )
                  }
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center mt-3 gap-4 lg:gap-6">
                {[
                  'SeTswana',
                  'IsiXhosa',
                  'Fulfulde',
                  'Ibibio',
                  'Jamaican Creole',
                  'Urhobo',
                  'Kanuri',
                ].map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className={`bg-brown-500 px-6 py-3 text-lg font-bold text-white rounded-lg text-center w-36`}
                    >
                      {ele}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="my-20">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {[
                  'Yoru\u0300ba\u0301',
                  'Esan',
                  'Igbo',
                  'Hausa',
                  'IsiZulu',
                  'Twi',
                  'Swahili',
                  'SeTswana',
                  'IsiXhosa',
                  'Fulfulde',
                  'Ibibio',
                  'Jamaican Creole',
                  'Urhobo',
                  'Kanuri',
                ].map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        index >= 7 ? 'bg-brown-500' : 'bg-yellow'
                      } px-6 py-3 text-base md:text-lg font-bold text-white rounded-lg text-center w-32`}
                    >
                      {ele}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="block md:flex text-lg text-black leading-loose justify-between mt-8 gap-12 text-justify">
            <div className="lg:w-1/2">
              <p>
                In the intricate dance between tradition and technology, Izesan! emerges as the
                storyteller of a digital era, where every keystroke is a brushstroke preserving the
                vivid tapestry of African languages. Here, we don&apos;t merely preserve heritage;
                we compose a symphony of evolution, harmonizing the authenticity of each word with
                the dynamic rhythm of progress.
              </p>
              <p className="mt-8">
                Izesan! is more than a language platform; it is a sanctuary for linguistic legacies,
                where the echoes of ancestral voices find resonance in the digital age. As we
                navigate the labyrinth of zeros and ones, our mission transcends mere
                preservation—it&apos;s a commitment to sculpting a future where African languages
                not only survive but flourish.
              </p>
            </div>
            <div className="lg:w-1/2">
              <p>
                In the binary code of our commitment, &apos;document, digitalize, and preserve&apos;
                becomes a mantra, and &apos;making everyday use easier&apos; transforms into a
                guiding light. We believe that every language is a living entity, pulsating with the
                heartbeat of culture, and our platform serves as a bridge between the timeless
                wisdom of tradition and the boundless possibilities of technology.
              </p>
              <p className="mt-8">
                Join us on this journey where each word is a brushstroke, each keystroke a note, and
                each language a masterpiece in the making. Izesan!: where the past whispers to the
                future, and every digital chapter adds a layer to the epic tale of linguistic
                evolution.
              </p>
            </div>
          </div>
        </div>
        <hr className="border-yellow border-2" />
        <div className="py-8 px-8 lg:px-12 flex flex-wrap items-center my-8 justify-between">
          <div
            className="rounded-full border-[14px] border-brown border-solid w-64 h-64 md:h-96 md:w-96 mx-auto scale-20"
            style={{
              backgroundImage: `url(/assets/images/about/ceo_image.svg)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="my-6 md:my-0 text-center md:text-left lg:w-1/2">
            <h3 className="text-4xl mb-6 font-bold ">The CEO</h3>

            <p className="text-lg text-black leading-loose text-justify">
              Anthony Otaigbe founded the Izesan! app In 2019 for the Esan people of Nigeria both
              within the country and in the diaspora. The platform has since grown to become the
              go-to learning application for languages like Hausa, Igbo, Yoruba, Ibibio, Esan, Tiv
              and more. From 2020 onwards, under Anthony&apos;s leadership, Izesan! has expanded its
              offering to over 300 courses in 20+ African languages.
            </p>
            <p className="text-lg text-black leading-loose text-justify">
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
