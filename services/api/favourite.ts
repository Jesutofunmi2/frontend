import useSWR from 'swr'
import { useSelector } from 'react-redux'
import makeApiCall from '.'

//ADD A GAME TO FAVOURITE
export const addFavourite = async (payload: any) => {
  try {
    const res = await makeApiCall(`/api/v1/auth/createFourite`, 'post', payload)
    return res
  } catch (err) {

    return err
  }
}

//GET FAVOURITE
export const useGetFavourites = (languageID: number, studentID: number) => {
  //NEW WAY TO FETCH DATA
  const fetcher = async () => {
    const res = await makeApiCall(
      `/api/v1/getFourites?language_id=${languageID}&student_id=${studentID}`,
      'get'
    )
    return res?.data
  }
  const { data, isLoading, isValidating } = useSWR(
    `/api/v1/getFourites?language_id=${languageID}&student_id=${studentID}`,
    fetcher
  )
  return { data, isLoading, isValidating }
}
