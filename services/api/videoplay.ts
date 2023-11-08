import useSWR from 'swr'
import makeApiCall from '.'

//GET VIDEO COURSE
export const useGetVideoPlay = (id: string) => {
  const fetcher = async () => {
    const res = await makeApiCall(`/api/v1/section?course_id=${id}`, 'get')
    return res?.data
  }
  const { data, isLoading, isValidating } = useSWR(`/api/v1/section?course_id=${id}`, fetcher)
  return { data, isLoading, isValidating }
}
