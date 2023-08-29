import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { urls } from "../../../../utils/urls/urls";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";
import { MalUserDto } from "./types/MalUserDto";

export default function useSaveMalUserMutation() {
  const url = urls.api.malUser;

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (malUser: MalUserDto) =>
      myClientAxios
        .post<MalUserDto>(urls.api.malUser, malUser)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        // const malUsers = queryClient.getQueryData<MalUserDto[]>(url);
        // const newMalUsers = pushOrReplace(malUsers, saved, "id");
        // queryClient.setQueryData(url, newMalUsers);

        setSuccessMessage("Saved MAL user");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
