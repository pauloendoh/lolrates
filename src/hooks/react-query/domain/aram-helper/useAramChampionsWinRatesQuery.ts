import myClientAxios from "@/utils/axios/myClientAxios";
import { queryKeys } from "@/utils/consts/queryKeys";
import { urls } from "@/utils/urls";
import { useQuery } from "react-query";
import { AramChampionWinRateDto } from "./types/AramChampionWinRateDto";

export const useAramChampionsWinRatesQuery = () => {
  return useQuery([queryKeys.aramChampionsWinRates], () =>
    myClientAxios
      .get<AramChampionWinRateDto[]>(urls.api.aramChampionWinRates)
      .then((res) => res.data)
  );
};
