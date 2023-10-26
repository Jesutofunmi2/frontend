import { request, tokens } from "@/config/config";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";




//ADD CLASS
export const useAddClass = (payloadData, mutate) => {

  // HEADERS
const config = {
  headers: {
    Authorization: "Bearer " + `${tokens ? tokens() : null}`,
  },
};
  
    async function sendRequest(url, { arg }) {
      toast.loading("Submitting...", {
        position: toast.POSITION.TOP_RIGHT,
      });
        console.log(arg)
      try {
        const res = await request.post(url, arg, config);
        mutate()
        console.log(res);
        toast.dismiss()
        if (res) {
          toast.success("Class Created!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        // mutate()
        return res;
      } catch (err) {
        toast.dismiss()
        if (err) {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log(err)
        return err;
      }
    }
  
    const { trigger, data, isMutating } = useSWRMutation(
      `/api/v1/addClass?school_id=${payloadData?.school_id}&language_id=${payloadData?.language_id}&class_room_name=${payloadData?.class_room_name}`,
      sendRequest
    );
  
    return { trigger, data, isMutating };
  };


  // GET CLASSES
export const useGetClasses = (schoolID) => {
console.log(schoolID)
  // HEADERS
const config = {
  headers: {
    Authorization: "Bearer " + `${tokens ? tokens() : null}`,
  },
};

  const fetcher = async (...args) => {
    const res = await request.get(...args, config);
    console.log(res)
      return res?.data;
  };
  
  const { data, isValidating, mutate } = useSWR(`/api/v1/showSchoolClasses?school_id=${schoolID}`, fetcher);
  return {mutate, data, isValidating };
  };




// DELETE CLASS
export const useDeleteClass = (schoolID, teacherId, mutate) => {

      // HEADERS
const config = {
  headers: {
    Authorization: "Bearer " + `${tokens ? tokens() : null}`,
  },
};

async function sendRequest(url, {arg}) {
  const endpoint = url + arg?.className
  toast.loading("Deleting...", {
    position: toast.POSITION.TOP_RIGHT,
  });
  try {
    const res = await request.delete(endpoint, config);
    mutate()
    console.log(res);
    toast.dismiss()
    
    if (res) {
      toast.success("Class Deleted!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return res;
  } catch (err) {
    toast.dismiss()
    if (err) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(err)
    return err;
  }
}

const { trigger, data, isMutating } = useSWRMutation(
  `/api/v1/deleteClass`,
  sendRequest
);

return { trigger, data, isMutating };
};





//ADD CLASS ARM
export const useAddClassArm = (payloadData, mutate) => {

  // HEADERS
const config = {
  headers: {
    Authorization: "Bearer " + `${tokens ? tokens() : null}`,
  },
};
  
    async function sendRequest(url, { arg }) {
      toast.loading("Submitting...", {
        position: toast.POSITION.TOP_RIGHT,
      });
        console.log(arg)
      try {
        const res = await request.post(url, arg, config);
        mutate()
        console.log(res);
        toast.dismiss()
        if (res) {
          toast.success("Class Arm Created!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        // mutate()
        return res;
      } catch (err) {
        toast.dismiss()
        if (err) {
          toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        console.log(err)
        return err;
      }
    }
  
    const { trigger, data, isMutating } = useSWRMutation(
      `/api/v1/addClassarm`,
      sendRequest
    );
  
    return { trigger, data, isMutating };
  };


    // GET CLASs ARM BY ID
export const useGetClassArmById = (schoolID, classID) => {
  console.log(schoolID)
    // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${tokens ? tokens() : null}`,
    },
  };
  
    const fetcher = async (...args) => {
      const res = await request.get(...args, config);
      console.log(res)
        return res?.data;
    };
    
    const { data, isValidating, mutate } = useSWR(`/api/v1/getSingleClass?school_id=${schoolID}&class_id=${classID}`, fetcher);
    return {mutate, data, isValidating };
    };