import React from "react";
import styles from "./AssignVideoForm.module.css";
import { BsFillPlayFill } from "react-icons/bs";
import Button from "@/components/Button/Button";

const data = [
  { title: "Brief History of Hausa", language: "Hausa" },
  { title: "Brief History of Yoruba", language: "Yoruba" },
  { title: "Brief History of Kanuri", language: "Kanuri" },
  { title: "Brief History of Eggon", language: "Eggon" },
];

const AssignVideoForm = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardWrap}>
          {data.map((item) => (
            <div
              className={styles.card}
              // key={item?.id}
              // onClick={() => handleClick(item)}
              key={item.title}
            >
              <BsFillPlayFill size={90} color="lightgreen" />
              <div className={styles.cardTextWrap}>
                <h4>{item.title}</h4>
                <p className={styles.downcardtext}>{item.language}</p>
              </div>
            </div>
          ))}
        </div>
       <div className={styles.btnWrap}>
          <Button maxWidth="150px" text="Save" title="Add" />
        </div>
      
        
      </div>
    </>
  );
};

export default AssignVideoForm;
