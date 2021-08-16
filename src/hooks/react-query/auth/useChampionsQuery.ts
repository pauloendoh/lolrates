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
export default function useChampionsQuery() {
  return useQuery(queryKeyUrl, () => fetchChampions(myClientAxios));
}
