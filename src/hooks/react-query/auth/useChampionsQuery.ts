import { useQuery } from "react-query";
import { urls } from "../../../consts/urls";
import { ChampionDto } from "../../../types/domain/general/ChampionDto";
import myClientAxios from "../../../utils/axios/myClientAxios";

const url = urls.api.champion;

// query
export default function useChampionsQuery() {
  return useQuery(url, () =>
    myClientAxios.get<ChampionDto[]>(url).then((res) => res.data)
  );
}

export function useQueryChampionById(championId: number) {
  const { data: allChampions } = useChampionsQuery();
  return allChampions.find((c) => c.id === championId);
}
