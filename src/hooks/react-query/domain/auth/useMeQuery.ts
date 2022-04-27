import { apiUrls } from "@/utils/apiUrls";
import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import { AuthUserGetDto } from "../../../../types/domain/auth/AuthUserGetDto";
import myClientAxios from "../../../../utils/axios/myClientAxios";

const queryKeyUrl = apiUrls.auth.me;

// fetch
export async function fetchMe(axios: AxiosInstance) {
  return axios.get<AuthUserGetDto>(queryKeyUrl).then((res) => res.data);
}

// query
export default function useMeQuery() {
  return useQuery(queryKeyUrl, () => fetchMe(myClientAxios), {
    retry: false,
    refetchOnWindowFocus: false,
  });
}
