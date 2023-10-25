import axios ,{ AxiosRequestConfig }from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "https://remotedev.izesan.com";

export const request = axios.create({
  baseURL: BASE_URL,
});
// export function tokens() {
//   const studentToken = useSelector(
//     (state) => state?.user?.currentUser?.token?.token
//   );

//   const schoolToken = useSelector(
//     (state) => state?.user?.currentSchool?.token.token
//   );

//   const teacherToken = useSelector(
//     (state) => state?.user?.currentTeacher?.token.token
//   );

//   const token = schoolToken || studentToken || teacherToken;

//   return token;
// }
