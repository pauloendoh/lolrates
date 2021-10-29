import useFetchDragItems from "./useFetchDragItems";

export default function useFetchDragItemsByContainer(containerId: number) {
  const { data: dragItems, ...others } = useFetchDragItems();

  const containerDragItems = dragItems
    ? dragItems.filter((item) => item.containerId === containerId)
    : undefined;

  return { ...others, data: containerDragItems };
}
