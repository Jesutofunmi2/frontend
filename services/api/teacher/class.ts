import makeApiCall from ".."
import useSWR from 'swr'

// GET CLASSES
export const useGetTeacherClasses = (teacherID: number) => {
    const url = `api/v1/showTeacherClasses?teacher_id=${teacherID}`
    const fetcher = async (...args: string[]) => {
      const res = await makeApiCall(url, 'get', ...args)
      return res?.data
    }
    const { data, isLoading, error, mutate } = useSWR(url, fetcher)
    return { data, isLoading, error, mutate }
  }

  