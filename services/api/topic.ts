import useSWR from "swr"
import makeApiCall from "."
import { ITopics } from "@/types/topics"

export const useGetTopics = (language_id:number|null) => {
    const url = `api/v1/type?type=standalone&language_id=${language_id}`
    const fetcher = async () => {
      const res = await makeApiCall(url, 'get')
      return res?.data
    }
    const { data, isLoading, error, mutate } = useSWR< ITopics[] ,Error>(url, fetcher)
    return { error, data, isLoading, mutate }
  }
  