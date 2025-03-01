import { queryKeys } from "@/utils/consts/queryKeys";
import { myLocalStorage } from "@/utils/myLocalStorage";
import { pushOrReplace } from "@/utils/pushOrReplace";
import { urls } from "@/utils/urls/urls";
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

        myLocalStorage.set(
          queryKeys.myAramChampions,
          queryClient.getQueryData<UserAramChampionDto[]>(
            queryKeys.myAramChampions
          ),
          {
            ttl: 60 * 60 * 12, // 12 hours
          }
        );
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
