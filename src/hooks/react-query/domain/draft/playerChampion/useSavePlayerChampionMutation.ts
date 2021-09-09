import produce from "immer";
import { useMutation, useQueryClient } from "react-query";
import { urls } from "../../../../../utils/urls";
import { PlayerChampionDto } from "../../../../../types/domain/draft/PlayerChampionDto";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useSavePlayerChampionMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (playerChampion: PlayerChampionDto) =>
      myClientAxios
        .post<PlayerChampionDto>(urls.api.playerChampion, playerChampion)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        const queryKey = urls.api.playerChampion;
        const pChampions =
          queryClient.getQueryData<PlayerChampionDto[]>(queryKey);

        const newPChampions = produce(pChampions, (draft) => {
          const index = draft.findIndex(
            (pChampion) => pChampion.id === saved.id
          );
          if (~index) {
            draft[index] = saved;
          } else {
            draft.push(saved);
          }
          return draft;
        });
        queryClient.setQueryData(queryKey, newPChampions);
        setSuccessMessage("Player champion saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
