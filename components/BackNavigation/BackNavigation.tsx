import { useRouter } from 'next/navigation'
import React from 'react'
import {BiArrowBack} from "react-icons/bi"

const BackNavigation = () => {
    const router = useRouter()
  return (
    <><BiArrowBack size={30} color='#f19c08' onClick={()=> router.back()}  style={{cursor:"pointer"}}/></>
  )
}

export default BackNavigation