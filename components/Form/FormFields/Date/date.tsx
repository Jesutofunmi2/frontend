import React from "react";
import styles from "./date.module.css";

const Date = ({
  handleChange,
  placeholder,
  title,
  name,
  defaultValue,
  value
}) => {

  return (
    <>
      <div className={styles.inputWrap}>
        <input
          value={value}
          type="date"
          name={name}
          placeholder={placeholder ? placeholder : ""}
          onChange={(e) => (handleChange ? handleChange(e) : null)}
          className={styles.input}
          required
        />
      </div>
    </>
  );
};

export default Date;