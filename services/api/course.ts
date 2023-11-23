import useSWR from 'swr'
import makeApiCall from '.'
import { ICourses } from '@/types/videos'

//GET VIDEO COURSE
export const useGetCourses = () => {
  const fetcher = async () => {
    const res = await makeApiCall(`/api/v1/getCourse`, 'get')
    return res?.data
  }
  const { data, isLoading, error } = useSWR<ICourses[],Error>(`/api/v1/getCourse`, fetcher)
  return { data, isLoading, error }
}
