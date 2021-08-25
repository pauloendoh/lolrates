import { useMutation, useQueryClient } from "react-query";
import { urls } from "../../../consts/urls";
import { PlayerChampionDto } from "../../../types/domain/draft/PlayerChampionDto";
import myClientAxios from "../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../stores/useSnackbarStore";

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
