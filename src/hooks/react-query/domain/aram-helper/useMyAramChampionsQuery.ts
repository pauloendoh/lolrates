import myClientAxios from "@/utils/axios/myClientAxios";
import { queryKeys } from "@/utils/consts/queryKeys";
import { urls } from "@/utils/urls/urls";
import { useQuery } from "react-query";
import { UserAramChampionDto } from "./types/UserAramChampionDto";

export const useMyAramChampionsQuery = () => {
  return useQuery([queryKeys.myAramChampions], () =>
    myClientAxios
      .get<UserAramChampionDto[]>(urls.api.myAramChampions)
      .then((res) => res.data)
  );
};
