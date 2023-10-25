import React from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./searchBar.module.css";

const SearchBar = () => {
  return (
    <>
      <form className={styles.form}>
        <CiSearch size={25} color=" #B7B7B7" />
        <input type="search" name="" id="" />
      </form>
    </>
  );
};

export default SearchBar;
