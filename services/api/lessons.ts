import useSWR from "swr";
import makeApiCall from ".";
import { Lesson} from "@/types/lessontopic";

//LESSONS
export const useGetLessons = (languageID:number) => {
  const fetcher = async () => {
    const res = await makeApiCall(`/api/v1/type?type=standalone&language_id=${languageID}`, "get");
      return res?.data;
  };
  const { data,isLoading, error,isValidating } = useSWR<Lesson[],Error>(`/api/v1/type?type=standalone&language_id=${languageID}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  return { data,isLoading, error, isValidating };
};
