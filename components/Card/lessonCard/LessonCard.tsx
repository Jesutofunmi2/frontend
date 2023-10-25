import React from "react";
import styles from "./lessonCard.module.css";
import Image from "next/image";
import Link from "next/link";

const LessonsCard = ({ post, languageID, setImageLoaded, language }) => {
  const percentageCalc = post?.percentage * 100;

  return (
    <>
      <Link
        href={{
          pathname:`/dashboard/languages/lessons/${post?.id}`,
          query: {
            language: language,
            lang: languageID,
            les: post?.id,
            type: post?.question_type
          },
        }}
        className={styles.lessonCardContainer}
      >
        <Image
          src={post?.media_url || ""}
          className={styles.img}
          width={400}
          height={100}
          alt="home image"
          onLoad={() => setImageLoaded(1)}
        />
        <div className={styles.title}>{post?.title}</div>
        <hr className={styles.break} />
        <div className={styles.progressWrap}>
          <div className={styles.span}>
            <div
              style={{
                backgroundColor: "green",
                borderRadius: "10px",
                width: `${post?.percentage > 100 ? 100 : post?.percentage}%`,
                height: "100%",
              }}
            ></div>
          </div>

          <p className={styles.percentage}>{post?.percentage}%</p>
        </div>
      </Link>
    </>
  );
};

export default LessonsCard;
