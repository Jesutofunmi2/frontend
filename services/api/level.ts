import useSWR from 'swr'
import makeApiCall from '.'

//GET LEVEL
export const useGetLevel = () => {
  const fetcher = async () => {
    const res = await makeApiCall(`/api/v1/section`, 'get')
    return res?.data
  }
  const { data, isLoading, error } = useSWR(`/api/v1/section`, fetcher)
  return { data, isLoading, error }
}
