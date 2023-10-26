"use client";

import FavouriteCard from "@/components/Card/favouriteCard/FavouriteCard";
import styles from "./page.module.css";
import { useGetFavourites } from "@/services/APIs/favourite";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useGetLanguages } from "@/services/APIs/languages";
import { useSelector } from "react-redux";

const Favourites = () => {
  const studentID = useSelector((state) => state?.user?.currentUser?.data?.student_id);
  const { data: language, isLoading } = useGetLanguages();
  const [languageID, setLanguageID] = useState("");
  const { data } = useGetFavourites(languageID, studentID);

  const options = language?.data?.map((item) => {
    return { value: item?.id, label: item?.name };
  });

  const handlechange = (e)=>{
    setLanguageID(e.value)
  }

  return (
    <>
      <div className={styles.container}>
        <h3>Favourites</h3>
        <Select options={options} onChange={handlechange}/>

        <div className={styles.cardWrap}>
          {data?.data?.map((item)=>(
            <FavouriteCard data={item} key={item.id}/>
          ))}
          
        </div>
      </div>
    </>
  );
};

export default Favourites;
