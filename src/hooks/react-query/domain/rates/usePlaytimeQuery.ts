import myClientAxios from "@/utils/axios/myClientAxios";
import { urls } from "@/utils/urls/urls";
import { useQuery } from "react-query";
import useMeQuery from "../auth/useMeQuery";

export const usePlaytimeQuery = (summonerName: string) => {
  const offsetHours = new Date().getTimezoneOffset() / 60;
  const { data } = useMeQuery();

  return useQuery(
    [urls.api.playtime(offsetHours, summonerName)],
    () =>
      myClientAxios
        .get<{
          playedMinutes: number;
        }>(urls.api.playtime(offsetHours, summonerName))
        .then((res) => res.data),
    {
      enabled: !!data && summonerName.length > 0,
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );
};
