import useSWR from 'swr'
import makeApiCall from '.'
import { Lesson } from '@/types/lessontopic'

//LESSONS
export const getModules = async (languageID: number) => {
  const res = await makeApiCall(`/api/v1/type?type=standalone&language_id=${languageID}`, 'get')
  return res?.data
}
