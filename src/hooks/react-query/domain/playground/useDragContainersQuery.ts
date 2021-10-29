import { DragContainerDto } from "@/types/domain/playground/dnd/DragContainerDto";
import { apiUrls } from "@/utils/apiUrls";
import { useQuery } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

export default function useDragContainersQuery() {
  const urlQueryKey = apiUrls.playground.dragContainers;

  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    urlQueryKey,
    () =>
      myClientAxios
        .get<DragContainerDto[]>(urlQueryKey)
        .then((res) => res.data),
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
