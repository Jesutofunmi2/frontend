import { request } from "@/config/config";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



//GET GRADEBOOK
  export const useGetGradebook = (languageID, studentID) => {
    const total = useSelector((state) => state?.user?.currentUser?.token.token);
  
  
    // HEADERS
    const config = {
      headers: {
        Authorization: "Bearer " + `${total}`,
      },
    };
  
    //NEW WAY TO FETCH DATA
    const fetcher = async (...args) => {
      const res = await request.get(...args, config);
      console.log(res)
      return res?.data;
    };
  
    const { data, isLoading, isValidating } = useSWR(`/api/v1/gradebook`, fetcher);
    return { data , isLoading, isValidating};
  };