import { useQuery } from "react-query";
import { urls } from "../../../consts/urls";
import { PlayerDto } from "../../../types/domain/draft/PlayerDto";
import myClientAxios from "../../../utils/axios/myClientAxios";

const url = urls.api.player;

// query
export default function usePlayersQuery() {
  return useQuery(url, () =>
    myClientAxios.get<PlayerDto[]>(url).then((res) => res.data)
  );
}
