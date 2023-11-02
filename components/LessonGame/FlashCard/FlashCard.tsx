import React from 'react'
import styles from './flashCard.module.css'
import { BsCheck } from 'react-icons/bs'
import Image from 'next/image'

interface FlashCardProps {
  selected: any
  setSelected: any
  option: any
  noTitle: any
}

const FlashCard = ({ selected, setSelected, option, noTitle }: FlashCardProps) => {
  const handleClick = (opt:any) => {
    setSelected(opt.id)

    const audio = new Audio(opt.media_url)
    audio.play()
  }

  return (
    <>
      <div
        className={selected === option.id ? styles.flashCardActive : styles.flashCard}
        onClick={() => handleClick(option)}
      >
        <div className={styles.imgWrap}>
          <div
            className={styles.triangleWrap}
            style={{ display: selected === option.id ? 'block' : 'none' }}
          >
            <div className={styles.triangleTopRight}>
              <BsCheck color="white" />
            </div>
          </div>
          <Image
            src={option.image_url || ''}
            width={150}
            height={130}
            className={styles.img}
            alt={option?.title}
          />
        </div>

        <div className={selected === option.id ? styles.bottomTextActive : styles.bottomText}>
          {noTitle ? null : <p className="languageText">{option.title}</p>}
        </div>
      </div>
    </>
  )
}

export default FlashCard
