import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import { apiRoutes } from "../../../consts/apiRoutes";
import { LolRateDto } from "../../../types/LolRate/LolRateDto";
import myClientAxios from "../../../utils/axios/myClientAxios";

const queryKeyUrl = apiRoutes.lolRates;

// fetch
export async function fetchLolRates(customAxios: AxiosInstance) {
  return customAxios.get<LolRateDto>(queryKeyUrl).then((res) => res.data);
}

// query
export default function useLolRates(initialData?: LolRateDto) {
  const { data, isLoading } = initialData
    ? useQuery(queryKeyUrl, () => fetchLolRates(myClientAxios), {
        initialData,
      })
    : useQuery(queryKeyUrl, () => fetchLolRates(myClientAxios));

  const { rates, updatedAt } = data ? data : { rates: [], updatedAt: null };
  return { rates, updatedAt, isLoading };
}
