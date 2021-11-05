import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../../zustand-stores/useSnackbarStore";

export default function useDeleteFolder() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (folderId: number) =>
      myClientAxios
        .delete<FolderWithSubfoldersDto[]>(
          apiUrls.playground.folderId(folderId)
        )
        .then((res) => res.data),
    {
      onSuccess: (folders) => {
        queryClient.setQueryData(queryKeys.folders, folders);
        setSuccessMessage("Folder deleted!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
