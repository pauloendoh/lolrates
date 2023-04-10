import { pushOrReplace } from "@/utils/pushOrReplace";
import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { urls } from "../../../../utils/urls";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

export default function useToggleMalCheckMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (id: number) =>
      myClientAxios
        .post<MalSimilarityDto>(urls.api.toggleMalCheck(id))
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        queryClient.setQueryData<MalSimilarityDto[]>(
          urls.api.malSimilarity,
          (old) => pushOrReplace(old, saved, "id")
        );
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
