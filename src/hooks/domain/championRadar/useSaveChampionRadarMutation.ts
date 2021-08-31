import produce from "immer";
import { useMutation, useQueryClient } from "react-query";
import { urls } from "../../../consts/urls";
import { ChampionRadarDto } from "../../../types/domain/draft/ChampionRadarDto";
import myClientAxios from "../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../stores/useSnackbarStore";

export default function useSaveChampionRadarMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  const url = urls.api.championRadar;

  return useMutation(
    (radar: ChampionRadarDto) =>
      myClientAxios
        .request<ChampionRadarDto>({
          url: url,
          data: radar,
          method: radar.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        const radars = queryClient.getQueryData<ChampionRadarDto[]>(url);

        const newRadars = produce(radars, (draft) => {
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
        queryClient.setQueryData(url, newRadars);
        setSuccessMessage("Radar saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
