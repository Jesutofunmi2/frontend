import { toast } from 'react-toastify'
import makeApiCall from '.'
import useSWR from 'swr'
import {
  IFileAssignment,
  IFileAssignmentPayload,
  IQuizAssignment,
  IQuizAssignmentPayload,
} from '@/types/assignment'

export const addFileAssignment = async (payload: FormData | IFileAssignmentPayload) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall('/api/v1/teacher/assignment/file', 'post', payload)
    toast.dismiss()
    if (res) {
      toast.success('File Assignment Created!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    toast.error('Request Failed!', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return err
  }
}

export const useGetFileAssignments = (school_id: number, class_id: Number, teacher_id: string) => {
  let url = `api/v1/teacher/assignment/file?school_id=${school_id}&class_id=${class_id}&teacher_id=${teacher_id}`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }
  const { data, isLoading, error, mutate } = useSWR<IFileAssignment[], Error>(url, fetcher)
  return { data, isLoading, error, mutate }
}

export const deleteFileAssignment = async (school_id: number, teacher_id: string, id: number) => {
  toast.loading('Deleting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(
      `api/v1/teacher/assignment/file?school_id=${school_id}&teacher_id=${teacher_id}&id=${id}`,
      'delete'
    )
    toast.dismiss()
    if (res) {
      toast.success('File Assignment Deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    toast.error('Request Failed!', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return err
  }
}

export const addQuizAssignment = async (payload: IQuizAssignmentPayload) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall('/api/v1/teacher/assignment/quiz', 'post', payload)
    toast.dismiss()
    if (res) {
      toast.success('Quiz Assignment Created!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    toast.error('Request Failed!', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return err
  }
}

export const useGetQuizAssignments = (school_id: number, class_id: Number, teacher_id: string) => {
  let url = `api/v1/teacher/assignment/quiz?school_id=${school_id}&class_id=${class_id}&teacher_id=${teacher_id}`
  const fetcher = async () => {
    const res = await makeApiCall(url, 'get')
    return res?.data
  }
  const { data, isLoading, error, mutate } = useSWR<IQuizAssignment[], Error>(url, fetcher)
  return { data, isLoading, error, mutate }
}

export const deleteQuizAssignment = async (
  school_id: number,
  class_id: Number,
  teacher_id: string,
  id: number
) => {
  toast.loading('Deleting...', {
    position: toast.POSITION.TOP_RIGHT,
  })
  try {
    const res = await makeApiCall(
      `api/v1/teacher/assignment/quiz?school_id=${school_id}&class_id=${class_id}&teacher_id=${teacher_id}&id=${id}`,
      'delete'
    )
    toast.dismiss()
    if (res) {
      toast.success('Quiz Assignment Deleted!', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
    return res
  } catch (err) {
    toast.dismiss()
    toast.error('Request Failed!', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return err
  }
}
