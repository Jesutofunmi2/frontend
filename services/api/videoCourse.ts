
import useSWR from "swr";
import makeApiCall from ".";

//GET VIDEO COURSE
export const useGetVideoCourse = () => {
  ;

  //NEW WAY TO FETCH DATA
  const fetcher = async () => {
    const res = await makeApiCall(`/api/v1/getCourse`,"get");

    return res?.data;
  };

  const { data, isLoading, error } = useSWR(`/api/v1/getCourse`, fetcher);
  return { data , isLoading, error};
};