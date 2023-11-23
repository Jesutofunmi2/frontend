import useSWR from 'swr'
import makeApiCall from '.'
import { IVideos} from '@/types/videos'

//GET VIDEO COURSE
export const useGetVideoCourse = (id: string) => {
  const url = `/api/v1/section?course_id=${id}`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }
  const { data, isLoading, isValidating } = useSWR<IVideos[], Error>(id?url:null, fetcher)
  return { data, isLoading, isValidating }
}
