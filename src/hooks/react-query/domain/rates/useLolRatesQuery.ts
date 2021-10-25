import { AxiosInstance } from "axios";
import { useQuery } from "react-query";
import { LolRateDto } from "../../../../types/domain/rates/LolRateDto";
import { apiUrls } from "../../../../utils/apiUrls";
import myClientAxios from "../../../../utils/axios/myClientAxios";

const url = apiUrls.lolRates;

// fetch
export async function fetchLolRates(customAxios: AxiosInstance) {
  return customAxios.get<LolRateDto>(url).then((res) => res.data);
}

// query
export default function useLolRatesQuery(initialData?: LolRateDto) {
  const { data, isLoading } = initialData
    ? useQuery(url, () => fetchLolRates(myClientAxios), {
        initialData,
      })
    : useQuery(url, () => fetchLolRates(myClientAxios));

  const { rates, updatedAt } = data ? data : { rates: [], updatedAt: null };
  return { rates, updatedAt, isLoading };
}

export function useChampionRateQuery(championName: string, role: string) {
  const { rates } = useLolRatesQuery();
  if (rates?.length > 0) {
    return rates.find(
      (rate) => rate.championName === championName && rate.role === role
    );
  }
  return null;
}
