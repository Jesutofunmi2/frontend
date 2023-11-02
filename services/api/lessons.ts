
import useSWR from "swr";

import makeApiCall from ".";

//LESSONS
export const useGetLessons = (languageID:number) => {
 

  //NEW WAY TO FETCH DATA
  const fetcher = async () => {
    const res = await makeApiCall(`/api/v1/type?type=standalone&language_id=${languageID}`, "get");
    console.log(res)
      return res?.data;
  };

  const { data,isValidating } = useSWR(`/api/v1/type?type=standalone&language_id=${languageID}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  // dispatch(lessonLoading(isValidating))
  return { data, isValidating };
};
