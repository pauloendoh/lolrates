import { useQuery } from "react-query";
import { PlayerDto } from "../../../../types/domain/draft/PlayerDto";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { urls } from "../../../../utils/urls/urls";

const url = urls.api.player;

// query
export default function usePlayersQuery() {
  const query = useQuery(url, () =>
    myClientAxios.get<PlayerDto[]>(url).then((res) => res.data)
  );
  return { allPlayers: query.data };
}
