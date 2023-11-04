import { request } from "@/config/config";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

import { toast } from "react-toastify";
import makeApiCall from ".";



//GET GRADEBOOK
  export const useGetGradebook = () => {
    //NEW WAY TO FETCH DATA
    const fetcher = async () => {
      const res = await makeApiCall(`/api/v1/gradebook`,"get");
      return res?.data;
    };
  
    const { data, isLoading, isValidating } = useSWR(`/api/v1/gradebook`, fetcher);
    return { data , isLoading, isValidating};
  };