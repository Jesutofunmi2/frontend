"use client";

import React from "react";
import styles from "./page.module.css";
import BackNavigation from "@/components/BackNavigation/BackNavigation";

const ClassWorkPage = () => {
  return (
    <>
      <div className={styles.container}>
        <BackNavigation />
        <h3 className="headerTitle">Yoruba Vowels</h3>

        <div className={styles.number}>
          <h3>Number of Students</h3>
          <div className={styles.figure}>6</div>
        </div>

        <div className={styles.body}>
          <div className={styles.descWrap}>
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              reprehenderit ducimus amet voluptates soluta suscipit in
              quibusdam, voluptatibus qui sint dignissimos autem recusandae
              voluptatem provident. Perferendis iure possimus eius quod
              recusandae dolorem, illo saepe sunt quasi reprehenderit velit
              consequuntur facilis laborum doloribus. Debitis iusto quam ad
              ipsam minima commodi ducimus officia, placeat harum error
              consectetur beatae sit aspernatur quidem odit rerum suscipit,
              praesentium reprehenderit, soluta dicta porro illo! Quas fuga enim
              dolor nulla perspiciatis aperiam voluptas ea? Nobis et, dolor
              excepturi eaque vel dolores nam molestiae! Eaque nam modi eligendi
              illo qui a aliquid non cupiditate. Totam enim excepturi aut?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassWorkPage;
