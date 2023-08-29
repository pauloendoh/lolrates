import { useQuery } from "react-query";
import { PlayerChampionDto } from "../../../../../types/domain/draft/PlayerChampionDto";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import { urls } from "../../../../../utils/urls/urls";

const url = urls.api.playerChampion;

export default function usePlayerChampionsQuery() {
  return useQuery(url, () =>
    myClientAxios.get<PlayerChampionDto[]>(url).then((res) => res.data)
  );
}
