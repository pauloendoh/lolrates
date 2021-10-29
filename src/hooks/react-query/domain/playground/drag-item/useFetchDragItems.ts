import { DragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useQuery } from "react-query";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useFetchDragItems() {
  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    queryKeys.dragItems,
    () =>
      myClientAxios
        .get<DragItemDto[]>(apiUrls.playground.dragItems)
        .then((res) => res.data),
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
