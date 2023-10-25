import React from "react";
import styles from "./select.module.css";
import Select from "react-select";

const Select2 = ({ title, options, setSelectedModule, setSelectedOption, value}) => {

  // Handle Select change
  const handlechange = (e) => {
    // setSelectedModule(e.value)
    setSelectedOption(e.value)
  };


  const kpo = options?.find((c) => {return c.value === value})

  console.log(kpo)

  // Select component styles
  const colourStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: "#F19C00",
      height: "45px",
      borderRadius: "15px",
      width: "100%",
    }),
//     menu: base => ({
//       ...base,
//       marginTop: 0,
//       height:"200px"
//   }),
//   menuList: base => ({
//     ...base,
//     padding: 0, height:"200px"
// })
  };
  return (
    <>
      <div>
        <p className={styles.label}>{title}</p>
        <Select
        required
          value={options?.find((c) => c.value === value)}
          options={options}
          onChange={handlechange}
          styles={colourStyles}

        >
          {value}jjj
        </Select>
      </div>
    </>
  );
};

export default Select2;
