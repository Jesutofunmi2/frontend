import useSWR from 'swr'
import makeApiCall from '.'

//GET GAME QUESTION
export const useGetLessonQuestions = async (languageID: number, lessonID: number) => {
  //NEW WAY TO FETCH DATA
  const fetcher = async () => {
    const res = await makeApiCall(
      `/api/v1/question?language_id=${languageID}&topic_id=${lessonID} `,
      'get'
    )
    return res?.data
  }
  const { data, isLoading, isValidating } = useSWR(
    `/api/v1/question?language_id=${languageID}&topic_id=${lessonID} `,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return { data, isLoading, isValidating }
}

// ******** POST REQUEST **********//

//POST GAME ANSWER (CHECK ANSWER)
export const checkAnswer = async (payload: any) => {
  try {
    const res = await makeApiCall(`/api/v1/option`, 'post', payload)
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}

//POST GAME ANSWER (CHECK ANSWER)
export const answeredQuestion = async (payload: any) => {
  try {
    const res = await makeApiCall(`/api/v1/questionAnswered`, 'post', payload)
    console.log(res)
    return res
  } catch (err) {
    console.log(err)
    return err
  }
}
