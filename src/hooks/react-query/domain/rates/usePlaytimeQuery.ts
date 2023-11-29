import myClientAxios from "@/utils/axios/myClientAxios";
import { urls } from "@/utils/urls/urls";
import { useQuery } from "react-query";

export const usePlaytimeQuery = (
  summonerName: string,
  startingWeekday: number
) => {
  const offsetHours = new Date().getTimezoneOffset() / 60;

  return useQuery(
    [urls.api.playtime(offsetHours, summonerName, startingWeekday)],
    () =>
      myClientAxios
        .get<{
          playedMinutes: number;
        }>(urls.api.playtime(offsetHours, summonerName, startingWeekday))
        .then((res) => res.data),
    {
      enabled: summonerName.length > 0,
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
};
