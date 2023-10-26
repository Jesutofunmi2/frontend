import React from 'react'
import styles from "./page.module.css";
import MedalCard from '@/components/Card/MedalCard/medalCard';
import { BsFillAwardFill} from "react-icons/bs";

const Medal = () => {
  const fakedata = [
    { text: "Bronze", icon: <BsFillAwardFill size={50}/> },
    { text: "Silver", icon: <BsFillAwardFill size={50}/> },
    { text: "Gold", icon: <BsFillAwardFill size={50}/> },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardWrap}>
          {fakedata?.map((item) => (
            <MedalCard item={item} key={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Medal