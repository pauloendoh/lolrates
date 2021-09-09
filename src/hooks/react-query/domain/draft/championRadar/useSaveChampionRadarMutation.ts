import useSnackbarStore from "hooks/zustand-stores/useSnackbarStore";
import { useMutation, useQueryClient } from "react-query";
import { ChampionRadarDto } from "types/domain/draft/ChampionRadarDto";
import myClientAxios from "utils/axios/myClientAxios";
import { pushOrReplace } from "utils/pushOrReplace";
import { urls } from "utils/urls";

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

        const newRadars = pushOrReplace(radars, saved, "id");

        queryClient.setQueryData(url, newRadars);
        setSuccessMessage("Radar saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
