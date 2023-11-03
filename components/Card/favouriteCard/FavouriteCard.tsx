import React from 'react'
import styles from "./favouriteCard.module.css"
import Image from 'next/image'
import { AiFillHeart } from 'react-icons/ai'

const FavouriteCard = ({data}:any) => {
  console.log(data)
  return (
    <>
    <div
        className={
          styles.flashCardActive 
        }
        // onClick={() => handleClick(option)}
      >
        <div className={styles.imgWrap}>
          <div
            className={styles.triangleWrap}
            style={{ display:  "block" }}
          >
            <div className={styles.triangleTopRight}>
              <AiFillHeart color="white" />
            </div>
          </div>
          <Image
            src="/assets/images/fav.webp"
            width={150}
            height={130}
            className={styles.img}
            alt="lo"
          />
        </div>

        <div
          className={
            styles.bottomTextActive 
          }
        >
          {data?.question[0]?.title}
        </div>
      </div>
    </>
  )
}

export default FavouriteCard