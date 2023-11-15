import makeApiCall from ".."
import useSWR from 'swr'

// GET CLASSES
export const useGetTeacherClasses = (schoolID:number,teacherID: number) => {
  // api/v1/showTeacherClasses?school_id=11&teacher_id=San/2023/IZESAN/00129
    const url = `api/v1/showTeacherClasses?school_id=${schoolID}&teacher_id=${teacherID}`
    const fetcher = async (...args: string[]) => {
      const res = await makeApiCall(url, 'get', ...args)
      return res?.data
    }
    const { data, isLoading, error, mutate } = useSWR(url, fetcher)
    return { data, isLoading, error, mutate }
  }

  