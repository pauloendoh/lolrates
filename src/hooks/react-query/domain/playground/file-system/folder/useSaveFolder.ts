import FolderDto from "@/types/domain/playground/file-system/FolderDto";
import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../../zustand-stores/useSnackbarStore";

export default function useSaveFolder() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (sentFolder: FolderDto) =>
      myClientAxios
        .request<FolderWithSubfoldersDto[]>({
          url: apiUrls.playground.folders,
          data: sentFolder,
          method: sentFolder.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (folders) => {
        queryClient.setQueryData(queryKeys.folders, folders);
        setSuccessMessage("Folder saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
