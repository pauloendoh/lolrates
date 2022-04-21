import Icons from "@/components/_common/Icons/Icons";
import useChangeDragItemPosition from "@/hooks/react-query/domain/playground/drag-item/useChangeDragItemPosition";
import useDndStore from "@/hooks/zustand-stores/useDndStore";
import { DragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { IDndItem } from "../../_common/IDndItem";
import S from "./DragItem.styles";

export default function DragItem(props: { dragItem: DragItemDto }) {
  const changeDragItemPosition = useChangeDragItemPosition();
  const { setDraggingItemId, draggingItemId: isDraggingItemId } = useDndStore();

  const [collected, dragRef, previewRef] = useDrag({
    type: "dnd-item",
    item: {
      id: props.dragItem.id,
      position: props.dragItem.position,
      containerId: props.dragItem.containerId, // será usado depois
    } as IDndItem,
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
  const previewHtmlRef = useRef<HTMLDivElement>();
  const dropHtmlRef = useRef<HTMLDivElement>();

  const [, dropRef] = useDrop({
    accept: "dnd-item",
    hover(item, monitor) {
      const dndItem = item as IDndItem;
      const fromPosition = dndItem.position;
      const toPosition = props.dragItem.position;
      const toContainerId = props.dragItem.containerId;

      const targetSize = previewHtmlRef.current.getBoundingClientRect();
      const targetCenterY = (targetSize.bottom - targetSize.top) / 2;

      if (
        dndItem.containerId === toContainerId &&
        fromPosition === toPosition
      ) {
        return; // required to avoid multiple events
      }

      const cursorCoord = monitor.getClientOffset();
      const draggedTopY = cursorCoord.y - targetSize.top;

      // ex: tentar arrastar o primeiro antes do segundo
      // também evita bugs em elementos de alturas diferentes
      if (
        dndItem.containerId === toContainerId &&
        fromPosition < toPosition &&
        draggedTopY < targetCenterY
      ) {
        return;
      }

      if (
        dndItem.containerId === toContainerId &&
        fromPosition > toPosition &&
        draggedTopY > targetCenterY
      ) {
        return;
      }

      // ex: drag one item to another container item's "after" position
      const toAfterPosition =
        dndItem.containerId !== toContainerId && draggedTopY > targetCenterY
          ? toPosition + 1
          : undefined;

      const toFirstPosition =
        dndItem.containerId !== toContainerId &&
        toPosition === 0 &&
        draggedTopY > targetCenterY
          ? 0
          : undefined;

      const toFinalPosition = toFirstPosition || toAfterPosition || toPosition;

      changeDragItemPosition({
        itemId: dndItem.id,
        fromPosition: dndItem.position,
        fromContainerId: dndItem.containerId,
        toPosition: toFinalPosition,
        toContainerId: toContainerId,
      });

      // required to avoid multiple events
      dndItem.position = toFinalPosition;
      dndItem.containerId = toContainerId;
    },
  });

  dragRef(dragHtmlRef);
  previewRef(previewHtmlRef);
  dropRef(dropHtmlRef);

  return (
    <S.DragItemRoot ref={dropHtmlRef}>
      <S.DragHandleWrapper ref={dragHtmlRef}>
        <Icons.DragHandle />
      </S.DragHandleWrapper>
      <S.DragItemPaper
        $isDragging={isDraggingItemId === props.dragItem.id}
        ref={previewHtmlRef}
      >
        {props.dragItem.name}
      </S.DragItemPaper>
    </S.DragItemRoot>
  );
}
