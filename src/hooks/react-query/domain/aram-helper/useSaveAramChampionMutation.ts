import { queryKeys } from "@/utils/consts/queryKeys";
import { pushOrReplace } from "@/utils/pushOrReplace";
import { urls } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";
import { UserAramChampionDto } from "./types/UserAramChampionDto";

export default function useSaveAramChampionMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (data: UserAramChampionDto) =>
      myClientAxios
        .post<UserAramChampionDto>(urls.api.myAramChampions, data)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        queryClient.setQueryData<UserAramChampionDto[]>(
          queryKeys.myAramChampions,
          (curr) => pushOrReplace(curr, saved, "id")
        );

        setSuccessMessage("Champion saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
