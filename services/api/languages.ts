import useSWR from 'swr'
import makeApiCall from '.'
import { ILanguage } from '@/types/languages'

//GET LANGUAGES
export const useGetLanguages = () => {
  const fetcher = async () => {
    const res = await makeApiCall(`/api/v1/language`, 'get')
    return res?.data
  }
  const { data, isLoading, isValidating, error } = useSWR<ILanguage[], Error>(
    `/api/v1/language`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { data, isLoading, isValidating, error }
}

export const useGetLanguageVideos = (language_id: number) => {
  const url = `/api/v1/type?type=sectional`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }
  const { data, isLoading, isValidating, error } = useSWR<ILanguage[], Error>(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return { data, isLoading, isValidating, error }
}
