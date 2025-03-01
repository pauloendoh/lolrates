import myClientAxios from "@/utils/axios/myClientAxios";
import { cachePromise } from "@/utils/cachePromise";
import { queryKeys } from "@/utils/consts/queryKeys";
import { urls } from "@/utils/urls/urls";
import { useQuery } from "react-query";
import { UserAramChampionDto } from "./types/UserAramChampionDto";

export const useMyAramChampionsQuery = () => {
  return useQuery([queryKeys.myAramChampions], () =>
    cachePromise(
      queryKeys.myAramChampions,
      1000 * 60 * 60 * 12, // 12 hours
      () =>
        myClientAxios
          .get<UserAramChampionDto[]>(urls.api.myAramChampions)
          .then((res) => res.data)
    )
  );
};
