// import { request, tokens } from "@/config/config";
// import useSWR from "swr";
// import {  useSelector } from "react-redux";

// //GET LANGUAGES
// export const useGetLanguages = () => {
//   const studentToken = useSelector((state) => state?.user?.currentUser?.token?.token);

//   // HEADERS
//   const config = {
//     headers: {
//       Authorization: "Bearer " + `${tokens ? tokens() : null}`,
//     },
//   };



//   //NEW WAY TO FETCH DATA
//   const fetcher = async (...args) => {
//     const res = await request.get(...args, config);
//     console.log(res)
//     return res?.data;
//   };

//   const { data, isLoading, isValidating } = useSWR(`/api/v1/language`, fetcher, {
//     revalidateIfStale: false,
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false
//   });
//   return { data , isLoading, isValidating};
// };


