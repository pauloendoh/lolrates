import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import myClientAxios from "@/utils/axios/myClientAxios";
import { queryKeys } from "@/utils/consts/queryKeys";
import { urls } from "@/utils/urls";
import { useQuery } from "react-query";
import { AramChampionWinRateDto } from "./types/AramChampionWinRateDto";

export const useAramChampionsWinRatesQuery = () => {
  const { lolgraphsUrl } = useAramHelperStore();
  return useQuery(
    [queryKeys.aramChampionsWinRates(lolgraphsUrl)],
    () =>
      myClientAxios
        .get<AramChampionWinRateDto[]>(
          urls.api.aramChampionWinRates(lolgraphsUrl)
        )
        .then((res) => res.data),
    {
      enabled: !!lolGraphsUrlIsValid(lolgraphsUrl),
    }
  );
};

export function lolGraphsUrlIsValid(lolgraphsUrl: string | undefined) {
  return (
    lolgraphsUrl &&
    lolgraphsUrl.includes("leagueofgraphs.com") &&
    lolgraphsUrl.includes("championsData-aram")
  );
}
