import React from "react";
import styles from "./select.module.css";

const Select = ({ title, option, name, defaultValue, handleChange }) => {
  return (
    <>
      <div className={styles.selectWrap}>
        <span>{title ? title : null}</span>
        <select
          name={name}
          defaultValue={defaultValue}
          className={styles.select}
          onChange={(e) => handleChange(e)}
          required
        >
          <option value="">{defaultValue ? defaultValue : "Select"}</option>
          {option?.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
