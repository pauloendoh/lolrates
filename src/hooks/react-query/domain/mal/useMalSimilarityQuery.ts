import { useQuery, UseQueryOptions } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { urls } from "../../../../utils/urls";

const url = urls.api.malSimilarity;

export default function useMalSimilarityQuery(
  options?: UseQueryOptions<MalSimilarityDto[]>
) {
  return useQuery<MalSimilarityDto[]>(
    url,
    () => myClientAxios.get<MalSimilarityDto[]>(url).then((res) => res.data),
    options
  );
}
