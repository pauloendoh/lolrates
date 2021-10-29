import { DragContainerDto } from "@/types/domain/playground/dnd/DragContainerDto";
import { apiUrls } from "@/utils/apiUrls";
import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { pushOrReplace } from "../../../../utils/pushOrReplace";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

export default function useSaveDragContainerMutation() {
  const urlQueryKey = apiUrls.playground.dragContainers;

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (dragContainer: DragContainerDto) =>
      myClientAxios
        .request<DragContainerDto>({
          url: urlQueryKey,
          data: dragContainer,
          method: dragContainer.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        const containers =
          queryClient.getQueryData<DragContainerDto[]>(urlQueryKey);
        const newContainers = pushOrReplace(containers, saved, "id");

        queryClient.setQueryData(urlQueryKey, newContainers);
        setSuccessMessage("Drag container saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
