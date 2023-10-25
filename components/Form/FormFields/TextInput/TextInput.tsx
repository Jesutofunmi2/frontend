import React from "react";
import styles from "./textInput.module.css";

const TextInput = ({
  handleChange,
  placeholder,
  title,
  name,
  defaultValue,
  type,
  readOnly
}) => {


  // FUCTION TO ALLOW TEXT ONLY WHEN TYPE IS "TEXT"
  const handleTextInput = (e) => {
    const key = e.key;
    if (
      (key >= "A" && key <= "Z") ||
      (key >= "a" && key <= "z") ||
      key === "" ||
      key === "Backspace"
    ) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  };

  

  return (
    <>
      <div className={styles.inputWrap}>
        <span>{title ? title : null}</span>
        <input
          defaultValue={defaultValue}
          type={type ? type : "text"}
          name={name}
          placeholder={placeholder ? placeholder : ""}
          onChange={(e) => (handleChange ? handleChange(e) : null)}
          className={styles.input}
          // onKeyDown={(e) => (type === "text" ? handleTextInput(e) : null)}
          required
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default TextInput;
