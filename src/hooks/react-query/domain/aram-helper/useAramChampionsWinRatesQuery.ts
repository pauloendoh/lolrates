import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import myClientAxios from "@/utils/axios/myClientAxios";
import { cachePromise } from "@/utils/cachePromise";
import { localStorageKeys } from "@/utils/consts/localStorageKeys";
import { queryKeys } from "@/utils/consts/queryKeys";
import { urls } from "@/utils/urls/urls";
import { useQuery } from "react-query";
import { AramChampionWinRateDto } from "./types/AramChampionWinRateDto";

export const useAramChampionsWinRatesQuery = () => {
  const { summonerName } = useAramHelperStore();
  return useQuery(
    [queryKeys.aramChampionsWinRates(summonerName)],
    () => {
      return cachePromise(
        localStorageKeys.summonerAramChampions(summonerName),
        1000 * 60 * 60 * 12,
        () =>
          myClientAxios
            .get<AramChampionWinRateDto[]>(
              urls.api.aramChampionWinRates(summonerName)
            )
            .then((res) => {
              return res.data;
            })
      );
    },
    {
      enabled: !!summonerName.length,
    }
  );
};
