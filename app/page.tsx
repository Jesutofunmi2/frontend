import React from "react";
import styles from "./page.module.css"
import Hero from "@/components/Hero/Hero";
import CloudMenu from "@/components/clouds/cloudMenus/CloudMenu";
import Mission from "@/components/mission/Mission";
import CloudTitle from "@/components/clouds/cloudTitle/CloudTitle";
import OurPrograms from "@/components/OurPrograms/OurPrograms";
import StatsCloud from "@/components/clouds/statsCloud/statsCloud";
import LeaderBoard from "@/components/LeaderBoard/LeaderBoard";
import BookTutor from "@/components/BookTutor/BookTutor";
import Footer from "@/components/Footer/Footer";
import HomeNavbar from "@/components/Navbar/HomeNavbar/HomeNavbar";

const Home = () => {
  return (
    <div>
      <div>
        <HomeNavbar />
        <Hero />
        <CloudMenu />
        <Mission />
        <CloudTitle title="Our Programs" />
        <OurPrograms />
        <StatsCloud />
        <CloudTitle title="LeaderBoard" />
        <LeaderBoard />
        <CloudTitle title="Book a tutor" />
        <BookTutor />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
