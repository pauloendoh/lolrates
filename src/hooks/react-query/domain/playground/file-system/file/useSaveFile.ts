import FileDto from "@/types/domain/playground/file-system/FileDto";
import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../../zustand-stores/useSnackbarStore";

export default function useSaveFile() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (sent: FileDto) =>
      myClientAxios
        .request<FolderWithSubfoldersDto[]>({
          url: apiUrls.playground.files,
          data: sent,
          method: sent.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (folders) => {
        queryClient.setQueryData(queryKeys.folders, folders);

        setSuccessMessage("File saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
