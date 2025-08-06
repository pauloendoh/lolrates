import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import myClientAxios from "@/utils/axios/myClientAxios";
import { queryKeys } from "@/utils/consts/queryKeys";
import { urls } from "@/utils/urls/urls";
import { useQuery } from "react-query";
import { AramChampionWinRateDto } from "./types/AramChampionWinRateDto";

export const useAramChampionsWinRatesQuery = () => {
  const { summonerName } = useAramHelperStore();
  return useQuery(
    [queryKeys.aramChampionsWinRates(summonerName)],
    () =>
      myClientAxios
        .get<AramChampionWinRateDto[]>(
          urls.api.aramChampionWinRates(summonerName)
        )
        .then((res) => res.data),
    {
      enabled: !!summonerName.length,
    }
  );
};
