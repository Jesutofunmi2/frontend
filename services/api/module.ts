import { request, tokens } from "@/config/config";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

//ADD MODULE FOR TEACHER
export const useAddModule = (mutate) => {
    const router = useRouter();
    
    
      // HEADERS
      const config = {
        headers: {
          Authorization: "Bearer " + `${tokens ? tokens() : null}`,
          "Content-Type": "multipart/form-data",
        },
      };
  
    
      async function sendRequest(url, { arg }) {
        toast.loading("Submitting...", {
          position: toast.POSITION.TOP_RIGHT,
        });
          console.log(arg)
        try {
          const res = await request.post(url, arg, config);
          console.log(res);
          toast.dismiss()
          if (res) {
            toast.success("Module Created!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          router.back()
          mutate()
          return res;
        } catch (err) {
          toast.dismiss()
          console.log(err)
          return err;
        }
      }
    
      const { trigger, data, isMutating } = useSWRMutation(
        `/api/v1/teacher/assignedModule`,
        sendRequest
      );
    
      return { trigger, data, isMutating };
    };


    

  //GET MODULE FOR TEACHER
  export const useGetAssignedModule = (param) => {
    const teacherToken = useSelector((state) => state?.user?.currentTeacher?.token.token);

    // HEADERS
    const config = {
      headers: {
        Authorization: "Bearer " + `${teacherToken}`,
      },
    };
  
    const fetcher = async (...args) => {
      const res = await request.get(...args, config);
      console.log(res)
      return res?.data;
    };
  
    const { data, isValidating, mutate } = useSWR(`/api/v1/teacher/assignedModule?school_id=${param?.school_id}&teacher_id=${param?.teacher_id}`, fetcher);
    return { data ,isValidating, mutate};
  };


  



    // DELETE MODULE
export const useDeleteModule = (mutate) => {
  const token = useSelector((state) => state?.user?.currentSchool?.token?.token);

    // HEADERS
    const config = {
      headers: {
        Authorization: "Bearer " + `${tokens ? tokens() : null}`,
      },
    };

  async function deleteModule(param) {
    console.log(param)
    const endpoint = `/api/v1/delete/assignedModule?school_id=${param?.school_id}&teacher_id=${param?.teacher_id}?id=${param.id}`
    toast.loading("Deleting...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    try {
      const res = await request.delete(endpoint, config);
      console.log(res);
      toast.dismiss()
      mutate()
      if (res) {
        toast.success("Module Deleted!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      return res;
    } catch (err) {
      toast.dismiss()
      console.log(err)
      return err;
    }
  }
  return {  deleteModule };
};


  
    //GET MODULE FOR STUDENT
    export const useGetAssignedModuleStudent = (param) => {
        const teacherToken = useSelector((state) => state?.user?.currentTeacher?.token.token);
        
        // HEADERS
        const config = {
          headers: {
            Authorization: "Bearer " + `${teacherToken}`,
          },
        };
      
        const fetcher = async (...args) => {
          const res = await request.get(...args, config);
          console.log(res)
          return res?.data;
        };
      
        const { data, isValidating, mutate } = useSWR(`api/v1/student/assignedModule?school_id=${param?.school_id}&class_id=${param?.teacher_id}`, fetcher);
        return { data ,isValidating, mutate};
      };