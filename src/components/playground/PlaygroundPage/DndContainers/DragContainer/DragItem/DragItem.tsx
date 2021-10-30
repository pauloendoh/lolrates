import useChangeDragItemPosition from "@/hooks/react-query/domain/playground/drag-item/useChangeDragItemPosition";
import useDndStore from "@/hooks/zustand-stores/useDndStore";
import { DragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { useTheme } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import S from "./DragItem.styles";

// PE 1/3 - jogar no types... ou common ? sei la xD
export interface DndItem {
  id: number;
  position: number;
  containerId: number;
}

export default function DragItem(props: { dragItem: DragItemDto }) {
  const changeDragItemPosition = useChangeDragItemPosition();
  const { setDraggingItemId, draggingItemId: isDraggingItemId } = useDndStore();

  const [collected, dragRef] = useDrag({
    type: "dnd-item",
    item: {
      id: props.dragItem.id,
      position: props.dragItem.position,
      containerId: props.dragItem.containerId, // será usado depois
    } as DndItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),

    end: () => {
      setDraggingItemId(null);
    },
  });

  useEffect(() => {
    if (collected?.isDragging) {
      setDraggingItemId(props.dragItem.id);
      return;
    }
  }, [collected?.isDragging]);

  const dragHtmlRef = useRef<HTMLDivElement>();
  const dropHtmlRef = useRef<HTMLDivElement>();

  const [, dropRef] = useDrop({
    accept: "dnd-item",
    hover(item, monitor) {
      const dndItem = item as DndItem;
      const fromPosition = dndItem.position;
      const toPosition = props.dragItem.position;
      const toContainerId = props.dragItem.containerId;

      const targetSize = dragHtmlRef.current.getBoundingClientRect();
      const targetCenterY = (targetSize.bottom - targetSize.top) / 2;

      if (dndItem.containerId === toContainerId && fromPosition === toPosition)
        return; // required to avoid multiple events

      const cursorCoord = monitor.getClientOffset();
      const draggedTopY = cursorCoord.y - targetSize.top;

      // ex: tentar arrastar o primeiro antes do segundo
      if (
        dndItem.containerId === toContainerId &&
        fromPosition < toPosition &&
        draggedTopY < targetCenterY
      )
        return;

      if (
        dndItem.containerId === toContainerId &&
        fromPosition > toPosition &&
        draggedTopY > targetCenterY
      )
        return;

      // ex: drag one item to another container's last position
      const toFinalPosition =
        dndItem.containerId !== toContainerId && draggedTopY > targetCenterY
          ? toPosition + 1
          : undefined;

      const toFirstPosition =
        dndItem.containerId !== toContainerId &&
        toPosition === 0 &&
        draggedTopY > targetCenterY
          ? 0
          : undefined;

      console.log({
        from: {
          containerId: dndItem.containerId,
          position: fromPosition,
        },
        to: {
          containerId: toContainerId,
          position: toFirstPosition || toFinalPosition || toPosition,
        },
      });

      changeDragItemPosition({
        itemId: dndItem.id,
        fromPosition: dndItem.position,
        fromContainerId: dndItem.containerId,
        toPosition: toFirstPosition || toFinalPosition || toPosition,
        toContainerId: toContainerId,
      });

      // required to avoid multiple events
      dndItem.position = toPosition;
      dndItem.containerId = toContainerId;
    },
  });

  dragRef(dragHtmlRef);
  dropRef(dropHtmlRef);

  const theme = useTheme();

  return (
    <div style={{ paddingTop: theme.spacing(1) }} ref={dropHtmlRef}>
      <S.DragItemPaper
        ref={dragHtmlRef}
        isDragging={isDraggingItemId === props.dragItem.id}
      >
        {props.dragItem.name}
      </S.DragItemPaper>
    </div>
  );
}
