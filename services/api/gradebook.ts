import useSWR from "swr";
import makeApiCall from ".";


  export const useGetGradebook = () => {
    //NEW WAY TO FETCH DATA
    const fetcher = async () => {
      const res = await makeApiCall(`/api/v1/gradebook`,"get");
      return res?.data;
    };
    const { data, isLoading, isValidating } = useSWR(`/api/v1/gradebook`, fetcher);
    return { data , isLoading, isValidating};
  };