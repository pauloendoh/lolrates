import useChangeDragItemPosition from "@/hooks/react-query/domain/playground/drag-item/useChangeDragItemPosition";
import { DragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { useTheme } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import S from "./DragItem.styles";

interface DndItem {
  id: number;
  position: number;
  containerId: number;
}

export default function DragItem(props: { dragItem: DragItemDto }) {
  const changeDragItemPosition = useChangeDragItemPosition();

  const [collected, dragRef] = useDrag({
    type: "dnd-item",
    item: {
      id: props.dragItem.id,
      position: props.dragItem.position,
      containerId: props.dragItem.containerId, // será usado depois
    } as DndItem,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const dragHtmlRef = useRef<HTMLDivElement>();
  const dropHtmlRef = useRef<HTMLDivElement>();

  const [lastDrag, setLastDrag] =
    useState<{ fromPosition: number; toPosition: number }>();

  const [, dropRef] = useDrop({
    accept: "dnd-item",
    hover(item, monitor) {
      const dndItem = item as DndItem;
      const fromPosition = dndItem.position;
      const toPosition = props.dragItem.position;
      const toContainerId = props.dragItem.containerId;

      const targetSize = dragHtmlRef.current.getBoundingClientRect();
      const targetCenterY = (targetSize.bottom - targetSize.top) / 2;

      if (fromPosition === toPosition) return; // required to avoid multiple events

      const cursorCoord = monitor.getClientOffset();
      const draggedTopY = cursorCoord.y - targetSize.top;

      if (fromPosition < toPosition && draggedTopY < targetCenterY) {
        return; // ex: tentar arrastar o primeiro antes do segundo
      }
      if (fromPosition > toPosition && draggedTopY > targetCenterY) {
        return;
      }

      console.log(`from ${fromPosition} to ${toPosition}`);

      changeDragItemPosition({
        itemId: dndItem.id,
        fromPosition: dndItem.position,
        fromContainerId: dndItem.containerId,
        toPosition: toPosition,
        toContainerId: toContainerId,
      });

      dndItem.position = toPosition; // required to avoid multiple events
    },
  });

  dragRef(dragHtmlRef);
  dropRef(dropHtmlRef);

  const theme = useTheme();

  return (
    <div style={{ paddingTop: theme.spacing(1) }} ref={dropHtmlRef}>
      <S.DragItemPaper ref={dragHtmlRef} isDragging={collected.isDragging}>
        {props.dragItem.name}
      </S.DragItemPaper>
    </div>
  );
}
