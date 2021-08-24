import produce from "immer";
import { useMutation, useQueryClient } from "react-query";
import { urls } from "../consts/urls";
import { PlayerDto } from "../types/dtos/PlayerDto";
import myClientAxios from "../utils/axios/myClientAxios";
import useSnackbarStore from "./stores/useSnackbarStore";

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
        const newPlayers = produce(players, (draft) => {
          const index = draft.findIndex((player) => player.id === saved.id);
          if (~index) {
            draft[index] = saved;
          } else {
            draft.push(saved);
          }
          return draft;
        });
        queryClient.setQueryData(url, newPlayers);
        setSuccessMessage("Player saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
