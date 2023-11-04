import FeatureCard from "@/components/Card/featureCard/FeatureCard";
import React from "react";
import styles from "./page.module.css";
import { FaUserFriends, FaUserGraduate } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BarChart, DoughnutChart } from "@/components/Chart/Chart";

const School = () => {
  const featureCardData = [
    {
      icon: <FaUserFriends size={40} color="green" />,
      figure: "133",
      title: "Total Teacher",
    },
    {
      icon: <FaUserGraduate size={40} color="green" />,
      figure: "3",
      title: "Total Student",
    },
    {
      icon: <IoIosPeople size={40} color="green" />,
      figure: "400",
      title: "Total Admin",
    },
  ];

  return (
    <>
      <div>
        <section className={styles.cardWrap}>
          {featureCardData.map((item) => (
            <FeatureCard data={item} key={item.title} />
          ))}
        </section>

        {/* <BarChart /> */}
        <section className={styles.doughnutWrap}>
          <DoughnutChart />
          <DoughnutChart />
        </section>
      </div>
    </>
  );
};

export default School;
