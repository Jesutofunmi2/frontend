import { request } from "@/config/config";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { lessonGameData } from "../redux/features/lessonGameSlice";


//GET GAME QUESTION
export const useGetLessonQuestions = (languageID, lessonID) => {
  const token = useSelector((state) => state?.user?.currentUser?.token.token);
  const dispatch = useDispatch();
  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${token}`,
    },
  };

  //NEW WAY TO FETCH DATA
  const fetcher = async (...args) => {
    const res = await request.get(...args, config);
    dispatch(lessonGameData(res.data))
    console.log(res.data)
    return res?.data;
  };

  const { data, isLoading, isValidating } = useSWR(
    `/api/v1/question?language_id=${languageID}&topic_id=${lessonID} `,
    fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  return { data, isLoading, isValidating };
};



// ******** POST REQUEST **********//

//POST GAME ANSWER (CHECK ANSWER)
export const useCheckAnswer = () => {
  const token = useSelector((state) => state?.user?.currentUser?.token.token);

  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${token}`,
    },
  };

  async function sendRequest(url, { arg }) {
    console.log(arg)
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
    `/api/v1/option`,
    sendRequest
  );

  return { trigger, data, isMutating };
};



//POST GAME ANSWER (CHECK ANSWER)
export const useAnsweredQuestion = () => {
  const token = useSelector((state) => state?.user?.currentUser?.token.token);

  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${token}`,
    },
  };

  async function sendRequest(url, { arg }) {
    console.log(arg)
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
    `/api/v1/questionAnswered`,
    sendRequest
  );

  return { trigger, data, isMutating };
};