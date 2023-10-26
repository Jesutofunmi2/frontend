"use client";

import React from "react";
import styles from "./page.module.css";
import LanguageCard from "@/components/Card/languageCard/LanguageCard";
import { useGetLanguages } from "@/services/APIs/languages";
import {Loader} from "@/components/Loader/Loader";
import { Fade } from "react-awesome-reveal";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Languages = () => {
  const { data, isLoading } = useGetLanguages();

  const countDown = useSelector(
    (state) => state?.user?.currentUser?.data?.count_down
  );
  
  console.log(data)
  // useEffect(() => {
  //   const kpo = () => {
  //     toast.error(`${countDown}`, {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: false,
  //       theme: "colored",
  //     });
  //   };

  //   const timer = setInterval(kpo, 2 * 60 * 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <div>
        <div className={styles.textWrap}>
          <h2>Languages</h2>
          <p>Choose your native language</p>
        </div>

        <div className={styles.wrapper}>
          <Fade
            cascade
            damping={0.1}
            style={{ maxWidth: "180px", width: "100%" }}
            direction="right"
          >
            {data?.data?.map((post) => (
              <LanguageCard key={post?.id} post={post} />
            ))}
          </Fade>
        </div>
        {isLoading ? <Loader /> : null}
      </div>
    </>
  );
};

export default Languages;
