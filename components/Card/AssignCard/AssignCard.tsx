import React from 'react'
import styles from './assignCard.module.css'
import Image from 'next/image'
import ful from '../../../public/assets/images/logo.png'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
interface AssignCardProps {
  item: any
  selected: any
  handleClick: () => void
  handleDelete: (item:any) => void
}
const AssignCard = ({ item, selected, handleClick, handleDelete }: AssignCardProps) => {
  // const navigate = useRouter('')
  return (
    <>
      <div className={styles.card}>
        <AiOutlineClose
          className={styles.deleteIcon}
          onClick={() => handleDelete(item)}
          size={22}
        />

        <div
          className={selected ? styles.cardActive : styles.innerWrap}
          key={item?.id}
          // onClick={() => navigate.push("/")}
        >
          <Image src={item?.media_url || ful} width={70} height={50} alt="pic" />
          <div className={styles.cardTextWrap}>
            <h4>{item?.title || 'language'}</h4>
            <p className={styles.downcardtext}>{item?.title}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignCard
