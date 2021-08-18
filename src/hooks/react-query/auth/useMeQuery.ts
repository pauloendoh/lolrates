import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import { apiRoutes } from "../../../consts/apiRoutes";
import { AuthUserGetDto } from "../../../types/dtos/auth/AuthUserGetDto";
import myClientAxios from "../../../utils/axios/myClientAxios";

const queryKeyUrl = apiRoutes.auth.me;

// fetch
export async function fetchMe(axios: AxiosInstance) {
  return axios.get<AuthUserGetDto>(queryKeyUrl).then((res) => res.data);
}

// query
export default function useMeQuery() {
  return useQuery(queryKeyUrl, () => fetchMe(myClientAxios), {retry: false});
}
