import { useMutation, useQueryClient } from "react-query";
import { PlayerChampionDto } from "../../../../../types/domain/draft/PlayerChampionDto";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import { urls } from "../../../../../utils/urls/urls";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useDeletePlayerChampionMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (pChampionId: number) =>
      myClientAxios
        .delete(urls.api.playerChampionId(pChampionId))
        .then((res) => res.data),
    {
      onSuccess: (_, sentId) => {
        const pChampions = queryClient.getQueryData<PlayerChampionDto[]>(
          urls.api.playerChampion
        );

        queryClient.setQueryData(
          urls.api.playerChampion,
          pChampions.filter((pChampion) => pChampion.id !== sentId)
        );
        setSuccessMessage("Champion deleted!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
