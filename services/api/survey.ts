import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'
import { surveyStatus } from '../redux/features/surveySlice'
import makeApiCall from '.'

//SUBMIT STUDENT SURVEY
export const addStudentSurvey = async (payload: any) => {
    toast.loading("Submitting...", {
      position: toast.POSITION.TOP_CENTER,
    });
  try {
    const res = await makeApiCall(`/api/v1/createStudentSurvey`, 'post', payload)
    return res
  } catch (err) {
    toast.dismiss()
    return err
  }
}

//SUBMIT TEACHER SURVEY
export const addTeacherSurvey = async(payload:any) => {
    toast.loading('Submitting...', {
      position: toast.POSITION.TOP_CENTER,
    })
    try {
      const res = await makeApiCall(`/api/v1/create/TeacherSurvey`, "post" ,payload)
      toast.dismiss()
      return res
    } catch (err) {
      toast.dismiss()
      return err
    }
  }


