import { DragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { INewDragItemPosition } from "@/types/domain/playground/dnd/INewDragItemPosition";
import { apiUrls } from "@/utils/apiUrls";
import myClientAxios from "@/utils/axios/myClientAxios";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { queryKeys } from "utils/consts/queryKeys";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useChangeDragItemPosition() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null);

  const queryClient = useQueryClient();

  const changeDragItemPosition = ({
    itemId,
    fromPosition,
    toPosition,
    fromContainerId,
    toContainerId,
  }: {
    itemId: number;
    fromPosition: number;
    toPosition: number;
    fromContainerId: number;
    toContainerId: number;
  }) => {
    const dragItems = queryClient.getQueryData<DragItemDto[]>(
      queryKeys.dragItems
    );

    const containerItems = dragItems.filter(
      (item) => item.containerId === toContainerId
    );

    // save -> remove -> splice -> normalize
    const dragItemIndex = containerItems.findIndex(
      (item) => item.id === itemId
    );
    const dragItem = { ...containerItems[dragItemIndex] } as DragItemDto;
    containerItems.splice(dragItemIndex, 1);
    containerItems.splice(toPosition, 0, dragItem);
    const newContainerItems = containerItems.map(
      (item, index) =>
        ({
          ...item,
          position: index,
        } as DragItemDto)
    );

    const newDragItems = [
      ...dragItems.filter((item) => item.containerId !== toContainerId),
      ...newContainerItems,
    ];

    queryClient.setQueryData(queryKeys.dragItems, newDragItems);

    saveNewPositions(newDragItems);
  };

  const saveNewPositions = (dragItems: DragItemDto[]) => {
    // SAVE on database
    clearTimeout(throttle);

    const newPositions: INewDragItemPosition[] = dragItems.map((item) => ({
      id: item.id,
      containerId: item.containerId,
      position: item.position,
    }));

    setThrottle(
      setTimeout(() => {
        myClientAxios
          .put(apiUrls.playground.dragItemsPositions, newPositions)
          .then((res) => {
            alert("Nice");
          })
          .catch((err) => alert("Error"));
      }, 1000)
    );
  };

  return changeDragItemPosition;
}
