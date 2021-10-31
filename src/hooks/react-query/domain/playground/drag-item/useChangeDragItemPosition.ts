import useDndStore from "@/hooks/zustand-stores/useDndStore";
import { DragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { INewDragItemPosition } from "@/types/domain/playground/dnd/INewDragItemPosition";
import { apiUrls } from "@/utils/apiUrls";
import myClientAxios from "@/utils/axios/myClientAxios";
import { useQueryClient } from "react-query";
import { queryKeys } from "utils/consts/queryKeys";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useChangeDragItemPosition() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const { throttle, setThrottle } = useDndStore();

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

    const toContainerItems = dragItems.filter(
      (item) => item.containerId === toContainerId
    );

    const fromContainerItems = dragItems.filter(
      (item) => item.containerId === fromContainerId
    );

    // save -> remove -> splice -> normalize
    const dragItemIndex = fromContainerItems.findIndex(
      (item) => item.id === itemId
    );
    const dragItem = fromContainerItems[dragItemIndex];

    // para garantir o "remove" nas duas situações
    if (fromContainerId === toContainerId) {
      toContainerItems.splice(dragItemIndex, 1);
    } else {
      fromContainerItems.splice(dragItemIndex, 1);
    }

    toContainerItems.splice(toPosition, 0, dragItem);
    const newToContainerItems = toContainerItems.map(
      (item, index) =>
        ({
          ...item,
          position: index,
          containerId: toContainerId,
        } as DragItemDto)
    );

    // se estiver mexendo no mesmo container, "ignore" essa etapa criando um array vazio
    const newFromContainerItems =
      fromContainerId === toContainerId
        ? []
        : fromContainerItems.map(
            (item, index) =>
              ({
                ...item,
                position: index,
                containerId: fromContainerId,
              } as DragItemDto)
          );

    const newDragItems = [
      ...dragItems.filter(
        (item) =>
          item.containerId !== toContainerId &&
          item.containerId !== fromContainerId
      ),
      ...newFromContainerItems,
      ...newToContainerItems,
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
          .catch(console.error);
      }, 1000)
    );
  };

  return changeDragItemPosition;
}
