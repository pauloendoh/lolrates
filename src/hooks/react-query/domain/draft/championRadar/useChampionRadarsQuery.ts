import { useQuery } from "react-query";
import { ChampionRadarDto } from "../../../../../types/domain/draft/ChampionRadarDto";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import { urls } from "../../../../../utils/urls/urls";

const url = urls.api.championRadar;

// query
export default function useChampionRadarsQuery() {
  return useQuery(url, () =>
    myClientAxios.get<ChampionRadarDto[]>(url).then((res) => res.data)
  );
}
