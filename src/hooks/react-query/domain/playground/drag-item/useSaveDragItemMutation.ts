import { DragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { apiUrls } from "@/utils/apiUrls";
import { useMutation, useQueryClient } from "react-query";
import { queryKeys } from "utils/consts/queryKeys";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import { pushOrReplace } from "../../../../../utils/pushOrReplace";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useSaveDragItemMutation() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (dragItem: DragItemDto) =>
      myClientAxios
        .request<DragItemDto>({
          url: apiUrls.playground.dragItems,
          data: dragItem,
          method: dragItem.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        const dragItems = queryClient.getQueryData<DragItemDto[]>(
          queryKeys.dragItems
        );
        const newDragItems = pushOrReplace(dragItems, saved, "id");

        queryClient.setQueryData(queryKeys.dragItems, newDragItems);
        setSuccessMessage("Drag item saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
