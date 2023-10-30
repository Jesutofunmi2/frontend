import { request, tokens } from "@/config/config";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { lessonLoading, lessonsData } from "../redux/features/lessonsSlice";

//LESSONS
export const useGetLessons = (languageID) => {
  const dispatch = useDispatch();

  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${tokens ?  tokens() : null}`,
    },
  };

  //NEW WAY TO FETCH DATA
  const fetcher = async (...args) => {
    const res = await request.get(...args, config);
    dispatch(lessonsData(res?.data))
    console.log(res)
      return res?.data;
  };

  const { data,isValidating } = useSWR(`/api/v1/type?type=standalone&language_id=${languageID}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  dispatch(lessonLoading(isValidating))
  return { data, isValidating };
};
