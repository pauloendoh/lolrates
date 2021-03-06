import { useQuery } from "react-query";
import { urls } from "../../../../utils/urls";
import { PlayerDto } from "../../../../types/domain/draft/PlayerDto";
import myClientAxios from "../../../../utils/axios/myClientAxios";

const url = urls.api.player;

// query
export default function usePlayersQuery() {
  const query =  useQuery(url, () =>
    myClientAxios.get<PlayerDto[]>(url).then((res) => res.data)
  );
  return { allPlayers: query.data} 
}
