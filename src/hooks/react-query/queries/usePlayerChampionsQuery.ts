import { useQuery } from "react-query";
import { urls } from "../../../consts/urls";
import { PlayerChampionDto } from "../../../types/domain/draft/PlayerChampionDto";
import myClientAxios from "../../../utils/axios/myClientAxios";

const url = urls.api.playerChampion;

export default function usePlayerChampionsQuery() {
  return useQuery(url, () =>
    myClientAxios.get<PlayerChampionDto[]>(url).then((res) => res.data)
  );
}

