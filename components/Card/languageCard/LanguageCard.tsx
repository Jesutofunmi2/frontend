"use client";

import React from "react";
import styles from "./languageCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { selectedLanguage } from "@/services/redux/features/selectedLanguageSlice";
import { useDispatch } from "react-redux";

const LanguageCard = ({ post }) => {
  const dispatch = useDispatch()

  const handleClick = (p)=>[
    dispatch(selectedLanguage(p?.name))
  ]

  return (
  <>
    <div className={styles.container}>
      {post?.status <= 0 ? <div className={styles.overlay}></div> : null}
      <Link
        href={{
          pathname: `/dashboard/languages/lessons`,
          query: {
            lang: post.id,
            language: post.name,
          },
        }}
        className={styles.card}
        // onClick={()=> handleClick(post)}
      >
        <Image
          src={post?.image_url}
          className={styles.img}
          width={400}
          height={100}
          alt={post?.name}
        />
        <hr className={styles.break} />
        <h3>{post?.name}</h3>
      </Link>
    </div>
    </>
  );
};

export default LanguageCard;
