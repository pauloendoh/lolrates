import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useQuery } from "react-query";
import myClientAxios from "../../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../../zustand-stores/useSnackbarStore";

export default function useFetchFolders() {
  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    queryKeys.folders,
    () =>
      myClientAxios
        .get<FolderWithSubfoldersDto[]>(apiUrls.playground.folders)
        .then((res) => res.data),
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
