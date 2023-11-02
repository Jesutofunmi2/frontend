import { request, tokens } from "@/config/config";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { surveyStatus } from "../redux/features/surveySlice";


//SUBMIT STUDENT SURVEY
export const useAddStudentSurvey = ( setModalOpen) => {
  const token = useSelector((state) => state?.user?.currentUser?.token.token);
  const dispatch = useDispatch();
  const router = useRouter();


  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${token}`,
    },
  };

  async function sendRequest(url, { arg }) {
    console.log(arg)
    toast.loading("Submitting...", {
      position: toast.POSITION.TOP_CENTER,
    });
      console.log(arg)
    try {
      const res = await request.post(url, arg, config);
      console.log(res);
      toast.dismiss()
     
      Swal.fire({   
        title: 'Success',
        // text: "Form Submitted",
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(surveyStatus(true))
        }
      })
      return res;
    } catch (err) {
      toast.dismiss()
      console.log(err)
      return err;
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(
    `/api/v1/createStudentSurvey`,
    sendRequest
  );

  return { trigger, data, isMutating };
};




//SUBMIT TEACHER SURVEY
export const useAddTeacherSurvey = () => {
  const token = useSelector((state) => state?.user?.currentTeacher?.token.token);
  const dispatch = useDispatch();


  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${token}`,
    },
  };

  async function sendRequest(url, { arg }) {
    console.log(arg)
    toast.loading("Submitting...", {
      position: toast.POSITION.TOP_CENTER,
    });
      console.log(arg)
    try {
      const res = await request.post(url, arg, config);
      console.log(res);
      toast.dismiss()

      Swal.fire({   
        title: 'Form Submitted',
        text: "Thank you",
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(surveyStatus(true))
        }
      })
      return res;
    } catch (err) {
      toast.dismiss()
      console.log(err)
      return err;
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(
    `/api/v1/create/TeacherSurvey`,
    sendRequest
  );

  return { trigger, data, isMutating };
};