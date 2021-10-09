import { useMutation, useQueryClient } from "react-query";
import { PlayerChampionDto } from "../../../../../types/domain/draft/PlayerChampionDto";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import { pushOrReplace } from "../../../../../utils/pushOrReplace";
import { urls } from "../../../../../utils/urls";
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

        const newPChampions = pushOrReplace(pChampions, saved, "id");

        queryClient.setQueryData(queryKey, newPChampions);
        setSuccessMessage("Player champion saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
