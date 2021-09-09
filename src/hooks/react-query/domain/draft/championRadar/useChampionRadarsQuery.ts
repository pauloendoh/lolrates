import { useQuery } from "react-query";
import { urls } from "../../../../../consts/urls";
import { ChampionRadarDto } from "../../../../../types/domain/draft/ChampionRadarDto";
import myClientAxios from "../../../../../utils/axios/myClientAxios";

const url = urls.api.championRadar;

// query
export default function useChampionRadarsQuery() {
  return useQuery(url, () =>
    myClientAxios.get<ChampionRadarDto[]>(url).then((res) => res.data)
  );
}
