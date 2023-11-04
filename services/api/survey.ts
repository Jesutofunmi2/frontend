import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { surveyStatus } from '../redux/features/surveySlice'
import makeApiCall from '.'

//SUBMIT STUDENT SURVEY
export const addStudentSurvey = async (payload: any) => {
  // const token = useSelector((state) => state?.user?.currentUser?.token.token);
  // const dispatch = useDispatch();
  // const router = useRouter();

  // async function sendRequest(url, { arg }) {

    toast.loading("Submitting...", {
      position: toast.POSITION.TOP_CENTER,
    });

  try {
    const res = await makeApiCall(`/api/v1/createStudentSurvey`, 'post', payload)

    // toast.dismiss()

    Swal.fire({
      title: 'Success',
      // text: "Form Submitted",
      icon: 'success',
      allowOutsideClick: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
      }
    })
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

      Swal.fire({
        title: 'Form Submitted',
        text: 'Thank you',
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // dispatch(surveyStatus(true))
        }
      })
      return res
    } catch (err) {
      toast.dismiss()

      return err
    }
  }


