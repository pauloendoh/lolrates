import { useMutation, useQueryClient } from "react-query";
import { PlayerDto } from "../../../../types/domain/draft/PlayerDto";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { pushOrReplace } from "../../../../utils/pushOrReplace";
import { urls } from "../../../../utils/urls/urls";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

export default function useSavePlayerMutation() {
  const url = urls.api.player;

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (player: PlayerDto) =>
      myClientAxios
        .request<PlayerDto>({
          url: urls.api.player,
          data: player,
          method: player.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        const players = queryClient.getQueryData<PlayerDto[]>(url);
        const newPlayers = pushOrReplace(players, saved, "id");

        queryClient.cancelQueries(url);
        queryClient.setQueryData(url, newPlayers);
        setSuccessMessage("Player saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
