import useDndStore from "@/hooks/zustand-stores/useDndStore";
import { DragContainerDto } from "@/types/domain/playground/dnd/DragContainerDto";
import { INewDragContainerPosition } from "@/types/domain/playground/dnd/INewDragContainerPosition";
import { apiUrls } from "@/utils/apiUrls";
import myClientAxios from "@/utils/axios/myClientAxios";
import { useQueryClient } from "react-query";

export default function useChangeContainerPosition() {
  const { throttle, setThrottle } = useDndStore();

  const queryClient = useQueryClient();

  const changeDragItemPosition = ({
    containerId,
    fromPosition,
    toPosition,
  }: {
    containerId: number;
    fromPosition: number;
    toPosition: number;
  }) => {
    const containers = queryClient.getQueryData<DragContainerDto[]>(
      apiUrls.playground.dragContainers
    );

    // save -> remove -> splice -> normalize
    const fromIndex = containers.findIndex(
      (container) => container.id === containerId
    );
    const container = containers[fromIndex];
    containers.splice(fromIndex, 1);
    containers.splice(toPosition, 0, container);

    const newContainers = containers.map(
      (container, index) =>
        ({
          ...container,
          position: index,
        } as DragContainerDto)
    );

    queryClient.setQueryData(apiUrls.playground.dragContainers, newContainers);
    saveNewPositions(newContainers);
  };

  const saveNewPositions = (newContainers: DragContainerDto[]) => {
    // SAVE on database
    clearTimeout(throttle);

    const newPositions: INewDragContainerPosition[] = newContainers.map(
      (container) => ({
        containerId: container.id,
        position: container.position,
      })
    );

    setThrottle(
      setTimeout(() => {
        myClientAxios
          .put(apiUrls.playground.dragContainerPositions, newPositions)
          .catch(console.error);
      }, 1000)
    );
  };

  return changeDragItemPosition;
}
