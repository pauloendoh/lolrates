import { AxiosInstance } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { apiRoutes } from "../../../../utils/apiRoutes";
import { AuthUserGetDto } from "../../../../types/domain/auth/AuthUserGetDto";
import myClientAxios from "../../../../utils/axios/myClientAxios";

const queryKeyUrl = apiRoutes.auth.me;

// fetch
export async function fetchMe(axios: AxiosInstance) {
  return axios.get<AuthUserGetDto>(queryKeyUrl).then((res) => res.data);
}

// query
export default function useMeQuery(queryOptions: UseQueryOptions<AuthUserGetDto>) {
  if (queryOptions)
    return useQuery(
      queryKeyUrl,
      () => fetchMe(myClientAxios),
      queryOptions
    );
  return useQuery(queryKeyUrl, () => fetchMe(myClientAxios));
}
