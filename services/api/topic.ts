import useSWR from "swr"
import makeApiCall from "."

export const useGetTopics = () => {
    const url = `/api/v1/topic`
    const fetcher = async () => {
      const res = await makeApiCall(url, 'get')
      return res?.data
    }
    const { data, isLoading, error, mutate } = useSWR(url, fetcher)
    return { error, data, isLoading, mutate }
  }
  