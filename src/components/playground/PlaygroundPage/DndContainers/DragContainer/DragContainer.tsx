import Flex from "@/components/_common/flexboxes/Flex";
import Txt from "@/components/_common/text/Txt";
import useChangeContainerPosition from "@/hooks/react-query/domain/playground/drag-container/useChangeContainerPosition";
import useChangeDragItemPosition from "@/hooks/react-query/domain/playground/drag-item/useChangeDragItemPosition";
import useFetchDragItemsByContainer from "@/hooks/react-query/domain/playground/drag-item/useFetchDragItemsByContainer";
import useDndStore from "@/hooks/zustand-stores/useDndStore";
import { DragContainerDto } from "@/types/domain/playground/dnd/DragContainerDto";
import { newDragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { Button, Paper, useTheme } from "@material-ui/core";
import React, { useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import DragItemDialog from "../DragItemDialog/DragItemDialog";
import DragItem, { DndItem } from "./DragItem/DragItem";

interface DndContainer {
  id: number;
  position: number;
}

export default function DragContainer({
  container,
  hasSpacingLeft,
}: {
  container: DragContainerDto;
  hasSpacingLeft: boolean;
}) {
  const [itemDialog, setItemDialog] = useState(false);

  const { data: dragItems } = useFetchDragItemsByContainer(container.id);

  const { setDraggingItemId } = useDndStore();

  const orderedDragItems = useMemo(() => {
    if (dragItems?.length > 0) {
      return dragItems.sort((a, b) => a.position - b.position);
    }
    return [];
  }, [dragItems]);

  const changeDragItemPosition = useChangeDragItemPosition();
  const changeContainerPosition = useChangeContainerPosition();

  const [{ isDragging: isDraggingContainer }, dragContainerRef] = useDrag({
    type: "dnd-container",
    item: {
      id: container.id,
      position: container.position,
    } as DndContainer,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropContainerRef] = useDrop({
    accept: "dnd-container",
    hover(item, monitor) {
      const fromContainer = item as DndContainer;
      const toContainer = {
        id: container.id,
        position: container.position,
      } as DndContainer;

      if (fromContainer.position === toContainer.position) return;

      const targetSize = htmlDragContainerRef.current.getBoundingClientRect();
      const targetCenterX = (targetSize.right - targetSize.left) / 2;

      const cursorCoord = monitor.getClientOffset();
      const draggedLeftX = cursorCoord.x - targetSize.left;

      // evita bugs em elementos de larguras diferentes
      if (
        fromContainer.position < toContainer.position &&
        draggedLeftX < targetCenterX
      )
        return;

      if (
        fromContainer.position > toContainer.position &&
        draggedLeftX > targetCenterX
      )
        return;

      changeContainerPosition({
        containerId: fromContainer.id,
        fromPosition: fromContainer.position,
        toPosition: toContainer.position,
      });

      fromContainer.position = toContainer.position;
    },
  });

  // quando dropar um item em cima de "+ add item" deve jogar no fim do container
  const [, dropItemRef] = useDrop({
    accept: "dnd-item",
    hover(item, monitor) {
      const dndItem = item as DndItem;
      const toPosition = orderedDragItems.length;
      const toContainerId = container.id;

      // tava lagando se eu ficasse spamando o drag em cima do + Add item
      if (
        dndItem.containerId === toContainerId &&
        dndItem.position === toPosition
      )
        return;

      changeDragItemPosition({
        itemId: dndItem.id,
        fromPosition: dndItem.position,
        fromContainerId: dndItem.containerId,
        toPosition: toPosition,
        toContainerId: toContainerId,
      });

      // required to avoid multiple events
      dndItem.position = toPosition;
      dndItem.containerId = toContainerId;
    },

    drop: () => {
      setDraggingItemId(null);
    },
  });

  const htmlDragContainerRef = useRef<HTMLDivElement>();
  dragContainerRef(htmlDragContainerRef);

  const htmlDropContainerRef = useRef<HTMLDivElement>();
  dropContainerRef(htmlDropContainerRef);

  const htmlDropItemRef = useRef<HTMLButtonElement>();
  dropItemRef(htmlDropItemRef);

  const theme = useTheme();

  return (
    <div
      style={{
        minWidth: 250,
        paddingLeft: hasSpacingLeft ? theme.spacing(2) : undefined,
      }}
      ref={htmlDropContainerRef}
    >
      <Paper
        style={{
          padding: theme.spacing(2),

          background: theme.palette.grey[800],
          width: "100%",
        }}
      >
        <div ref={htmlDragContainerRef} style={{ cursor: "grab" }}>
          <Txt variant="h6">{container.name}</Txt>
        </div>

        <Flex style={{ flexDirection: "column" }}>
          {orderedDragItems.map((item) => (
            <DragItem key={item.id} dragItem={item} />
          ))}
        </Flex>

        <Button onClick={() => setItemDialog(true)} ref={htmlDropItemRef}>
          + Add item
        </Button>

        <DragItemDialog
          open={itemDialog}
          initialValue={newDragItemDto(container.id)}
          onClose={() => setItemDialog(false)}
        />
      </Paper>
    </div>
  );
}
