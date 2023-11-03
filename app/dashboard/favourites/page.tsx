'use client'

import FavouriteCard from '@/components/Card/favouriteCard/FavouriteCard'
import styles from './page.module.css'
import { useGetFavourites } from '@/services/api/favourite'
import React, { useState } from 'react'
import Select from 'react-select'
import { useGetLanguages } from '@/services/api/languages'
import { useSelector } from 'react-redux'
import { userData } from '@/services/redux/features/userSlice'
import { Loader } from '@/components/Loader/Loader'

const Favourites = () => {
  // const studentID = useSelector((state) => state?.user?.currentUser?.data?.student_id)
  const studentID = Number(useSelector(userData).currentUser?.data?.student_id!)
  const { data: language, isLoading: isLoadingLanguages, error } = useGetLanguages()
  const [languageID, setLanguageID] = useState<Number>()
  // const { data: favourites, isLoading } = useGetFavourites(languageID, studentID)
  if (!language) return null
  if (isLoadingLanguages) return <Loader />
  if (error) return <p>error page</p>

  const options = language?.map((item) => {
    return { value: item?.id, label: item?.name }
  })

  const handlechange = (e: any) => {
    setLanguageID(e.value)
  }

  return (
    <>
      <div className={styles.container}>
        <h3>Favourites</h3>
        <Select options={options} onChange={handlechange} />

        <div className={styles.cardWrap}>
          {/* {favourites.map((item:any) => <FavouriteCard data={item} key={item.id} />)} */}
        </div>
      </div>
    </>
  )
}

export default Favourites
