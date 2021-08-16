import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import { LolRateDto } from "../../../types/LolRate/LolRateDto";
import { apiRoutes } from "../../../consts/apiRoutes";
import myClientAxios from "../../../utils/axios/myClientAxios";

const queryKeyUrl = apiRoutes.lolRates;

// fetch
export async function fetchChampions(customAxios: AxiosInstance) {
  return customAxios.get<LolRateDto>(queryKeyUrl).then((res) => res.data);
}

// query
export default function useChampionsQuery(initialData?: LolRateDto) {
  const { data, isLoading } = initialData
    ? useQuery(queryKeyUrl, () => fetchChampions(myClientAxios), {
        initialData,
      })
    : useQuery(queryKeyUrl, () => fetchChampions(myClientAxios));

  const { rates, updatedAt } = data ? data : { rates: [], updatedAt: null };
  return { data, rates, updatedAt, isLoading };
}
