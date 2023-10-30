import { request } from "@/config/config";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



//ADD A GAME TO FAVOURITE
export const useAddFavourite = () => {
    const token = useSelector((state) => state?.user?.currentUser?.token.token);
  
    // HEADERS
    const config = {
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
    };
    async function sendRequest(url, { arg }) {
      try {
        const res = await request.post(url, arg, config);
        console.log(res);
        return res;
      } catch (err) {
        console.log(err)
        return err;
      }
    }
  
    const { trigger, data, isMutating } = useSWRMutation(
      `/api/v1/auth/createFourite`,
      sendRequest
    );
  
    return { trigger, data, isMutating };
  };


  //GET FAVOURITE
export const useGetFavourites = (languageID, studentID) => {
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

  const { data, isLoading, isValidating } = useSWR(`/api/v1/getFourites?language_id=${languageID}&student_id=${studentID}`, fetcher);
  return { data , isLoading, isValidating};
};