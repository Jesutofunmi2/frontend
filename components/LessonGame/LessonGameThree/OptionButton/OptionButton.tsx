"use client";

import React from "react";
import styles from "./optionButton.module.css";

const OptionButton = ({ text, color, backgroundColor, width, height, size, maxWidth, disabled, handleClick, id}) => {
  return (
    <ul
      style={{
        background: `${backgroundColor}`,
        color: `${color}`,
        maxWidth: `${maxWidth}`,
        width: `${width}`,
        height:`${height}`,
        fontSize:`${size}`,
      }}
      onClick={()=> handleClick ?  handleClick(id) : null}
      className={styles.answer}

      disabled={disabled}
    >
       <span className={`${styles.listText} languageText`}>{text ? text : "Button"}</span>
    </ul>
  );
};

export default OptionButton;