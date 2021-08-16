import { parse } from "dotenv/types";
import { useQuery } from "react-query";
import { apiRoutes } from "../../../consts/apiRoutes";
import myClientAxios from "../../../utils/axios/myClientAxios";
import { AuthUserGetDto } from "../../../types/dtos/auth/AuthUserGetDto";
import { AxiosInstance } from "axios";

const queryKeyUrl = apiRoutes.auth.me

// fetch
export async function fetchMe(axios: AxiosInstance) {
  return axios.get<AuthUserGetDto>(queryKeyUrl).then(
    (res) => res.data
  )
}

// query
export default function useMeQuery(initialData?: AuthUserGetDto) {
  return useQuery(queryKeyUrl, () => fetchMe(myClientAxios), { initialData })
}
