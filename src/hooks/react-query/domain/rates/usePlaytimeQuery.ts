import myClientAxios from "@/utils/axios/myClientAxios";
import { urls } from "@/utils/urls/urls";
import { useQuery } from "react-query";

export const usePlaytimeQuery = (summonerName: string) => {
  const offsetHours = new Date().getTimezoneOffset() / 60;

  return useQuery(
    [urls.api.playtime(offsetHours, summonerName)],
    () =>
      myClientAxios
        .get<{
          playedMinutes: number;
        }>(urls.api.playtime(offsetHours, summonerName))
        .then((res) => res.data),
    {
      enabled: summonerName.length > 0,
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
};
