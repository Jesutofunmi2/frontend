import { request } from "@/config/config";
import useSWRMutation from "swr/mutation";
import { login, schoolLogin, teacherLogin } from "../redux/features/userSlice";
import { useDispatch} from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosRequestConfig }from "axios";
  // HEADERS
  const config = {
    Headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };



  
// ******** POST REQUEST **********//

//STUDENT LOGIN
export const useLoginStudent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  async function sendRequest(url: string, { arg }: any) {
    toast.loading("Signing you in...", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const res = await request.post(url, arg, config);
      dispatch(login(res.data));
      toast.dismiss();
      // console.log(res.data?.data?.count_down);
      router?.push("/dashboard/languages");
      if (res.data?.data?.count_down) {
        toast.error(`${res.data?.data?.count_down}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
          theme:"colored",
        });
      }
      // console.log(res)
      return res;
    } catch (err) {
      // console.log(err)
      toast.dismiss();
      if (err) {
        toast.error("Invalid Credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      return err;
    }
  }

  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/v1/auth/studentLogin`,
    sendRequest
  );
  return { trigger, data };
};



// SCHOOL LOGIN
export const useLoginSchool = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  async function sendRequest(url: string, { arg }: any) {
    
    toast.loading("Signing you in...", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const res = await request.post(url, arg, config);
      dispatch(schoolLogin(res.data));
      toast.dismiss();
      router?.push("/school/profile");
      // console.log(res)
      return res;
    } catch (err) {
      // console.log(err)
      toast.dismiss();
      if (err) {
        toast.error("Invalid Credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      return err;
    }
  }

  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/v1/auth/schoolLogin`,
    sendRequest
  );

  return { trigger, data };
};


// TEACHER LOGIN
export const useLoginTeacher = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  async function sendRequest(url: string, { arg }: any) {
    
    toast.loading("Signing you in...", {
      position: toast.POSITION.TOP_CENTER,
    });
    try {
      const res = await request.post(url, arg);
      dispatch(teacherLogin(res.data));
      toast.dismiss();
      router?.push("/teacher");
      // console.log(res)
      if (res.data?.data?.count_down) {
        toast.error(`${res.data?.data?.count_down}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
          theme:"colored",
        });
      }
      return res;
    } catch (err) {
      console.log(err)
      toast.dismiss();
      if (err) {
        toast.error("Invalid Credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      return err;
    }
  }

  const { trigger, data, isMutating, error } = useSWRMutation(
    `/api/v1/auth/teacherLogin`,
    sendRequest
  );

  return { trigger, data };
};