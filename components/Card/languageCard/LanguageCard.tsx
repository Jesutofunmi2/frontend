'use client'

import React from 'react'
import styles from './languageCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ILanguage } from '@/types/languages'

interface LanguageCardProps {
  card: ILanguage
}

const LanguageCard = ({ card }: LanguageCardProps) => {
  return (
    <>
      <div className={styles.container}>
        {card?.status <= 0 ? <div className={styles.overlay}></div> : null}
        <Link
          href={{
            pathname: `/dashboard/languages/lessons`,
            query: {
              lang: card.id,
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
          {/* <hr className={styles.break} /> */}
          <h3 className="mt-4 text-xl">{card.name}</h3>
        </Link>
      </div>
    </>
  )
}

export default LanguageCard
