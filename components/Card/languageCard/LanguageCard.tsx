"use client";

import React from "react";
import styles from "./languageCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { selectedLanguage } from "@/services/redux/features/selectedLanguageSlice";
import { useDispatch } from "react-redux";

const LanguageCard = ({card }:any) => {
  const dispatch = useDispatch()

  const handleClick = (p:any)=>[
    dispatch(selectedLanguage(p?.name))
  ]
  console.log(card)
  return (
  <>
    <div className={styles.container}>
      {/* {card?.status <= 0 ? <div className={styles.overlay}></div> : null} */}
      <Link
        href={{
          pathname: `/dashboard/languages/lessons`,
          query: {
            lang:card.id,
            language: card.name,
          },
        }}
        className={styles.card}
        // onClick={()=> handleClick(post)}
      >
        <Image
          src={card.image_url}
          className={styles.img}
          width={400}
          height={100}
          alt={card.name}
        />
        <hr className={styles.break} />
        <h3>{card?.name}</h3>
      </Link>
    </div>
    </>
  );
};

export default LanguageCard;
