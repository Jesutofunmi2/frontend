import useSWR from 'swr'
import makeApiCall from '.'
import { LessonQuestion } from '@/types/lessontopic'

//GET GAME QUESTION
export const useGetLessonQuestions = (languageID: number|null, lessonID: number|null) => {
  const url = `/api/v1/question?language_id=${languageID}&topic_id=${lessonID} `
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }
  const { data, isLoading, error } = useSWR<LessonQuestion[], Error>(
    languageID && lessonID !== null ? url : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { data, isLoading, error }
}

export const checkAnswer = async (payload: any) => {
  try {
    const res = await makeApiCall(`/api/v1/option`, 'post', payload)
    return res
  } catch (err) {
    return err
  }
}

//POST GAME ANSWER (CHECK ANSWER)
export const answeredQuestion = async (payload: any) => {
  try {
    const res = await makeApiCall(`/api/v1/questionAnswered`, 'post', payload)
    return res
  } catch (err) {
    return err
  }
}
