import { useQuery, UseQueryOptions } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { urls } from "../../../../utils/urls/urls";
import { MalUserDto } from "./types/MalUserDto";

const url = urls.api.malUser;

// query
export default function useMalUserQuery(options?: UseQueryOptions<MalUserDto>) {
  return useQuery<MalUserDto>(
    url,
    () => myClientAxios.get<MalUserDto>(url).then((res) => res.data),
    {
      ...options,
    }
  );
}
