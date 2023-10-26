import { request } from "@/config/config";
import useSWR from "swr";
import {  useSelector } from "react-redux";

//GET VIDEO COURSE
export const useGetVideoCourse = () => {
  const token = useSelector((state) => state?.user?.currentUser?.token?.token);


  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${token}`,
    },
  };

  //NEW WAY TO FETCH DATA
  const fetcher = async (...args) => {
    const res = await request.get(...args, config);
    console.log(res)
    return res?.data;
  };

  const { data, isLoading, isValidating } = useSWR(`/api/v1/getCourse`, fetcher);
  return { data , isLoading, isValidating};
};