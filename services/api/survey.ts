import { toast } from 'react-toastify'
import makeApiCall from '.'
import Swal from 'sweetalert2'

//SUBMIT STUDENT SURVEY
export const addStudentSurvey = async (payload: any) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_CENTER,
  })
  try {
    const res = await makeApiCall(`/api/v1/createStudentSurvey`, 'post', payload)
    toast.dismiss()
    return res
  } catch (err) {
    toast.dismiss()
    toast.error('Request Failed!', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return err
  }
}

//SUBMIT TEACHER SURVEY
export const addTeacherSurvey = async (payload: any) => {
  toast.loading('Submitting...', {
    position: toast.POSITION.TOP_CENTER,
  })
  try {
    const res = await makeApiCall(`/api/v1/create/TeacherSurvey`, 'post', payload)
    toast.dismiss()
    if (res.message) {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'OK',
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
