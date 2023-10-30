import { request, tokens } from "@/config/config";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";

//ADD MODULE FOR TEACHER
export const usePost = (url) => {

  // HEADERS
  const config = {
    headers: {
      Authorization: "Bearer " + `${tokens ? tokens() : null}`,
      "Content-Type": "multipart/form-data",
    },
  };

  async function sendRequest(url, { arg }) {
    toast.loading("Submitting...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(arg);
    try {
      const res = await request.post(url, arg, config);
      console.log(res);
      toast.dismiss();
      if (res) {
        toast.success("Module Created!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    //   mutate();
      return res;
    } catch (err) {
      toast.dismiss();
      console.log(err);
      return err;
    }
  }

  const { trigger, data, isMutating } = useSWRMutation(
    url,
    sendRequest
  );

  return { trigger, data, isMutating };
};
