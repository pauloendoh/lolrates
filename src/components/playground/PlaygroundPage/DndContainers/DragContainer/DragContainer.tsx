import Flex from "@/components/_common/flexboxes/Flex";
import Txt from "@/components/_common/text/Txt";
import useChangeDragItemPosition from "@/hooks/react-query/domain/playground/drag-item/useChangeDragItemPosition";
import useFetchDragItemsByContainer from "@/hooks/react-query/domain/playground/drag-item/useFetchDragItemsByContainer";
import useDndStore from "@/hooks/zustand-stores/useDndStore";
import { DragContainerDto } from "@/types/domain/playground/dnd/DragContainerDto";
import { newDragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { Box, Button, Paper, useTheme } from "@material-ui/core";
import React, { useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import DragItemDialog from "../DragItemDialog/DragItemDialog";
import DragItem, { DndItem } from "./DragItem/DragItem";

export default function DragContainer({
  container,
}: {
  container: DragContainerDto;
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

  const [, dropRef] = useDrop({
    accept: "dnd-item",
    hover(item, monitor) {
      const dndItem = item as DndItem;
      const toPosition = orderedDragItems.length;
      const toContainerId = container.id;

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

  const htmlDropRef = useRef<HTMLButtonElement>();

  dropRef(htmlDropRef);

  const theme = useTheme();

  return (
    <Paper
      key={container.id}
      style={{
        padding: theme.spacing(2),
        minWidth: 150,
        background: theme.palette.grey[800],
      }}
    >
      <Box>
        <Txt variant="h6">{container.name}</Txt>
      </Box>

      <Flex style={{ flexDirection: "column" }}>
        {orderedDragItems.map((item) => (
          <DragItem key={item.id} dragItem={item} />
        ))}
      </Flex>

      <Button onClick={() => setItemDialog(true)} ref={htmlDropRef}>
        + Add item
      </Button>

      <DragItemDialog
        open={itemDialog}
        initialValue={newDragItemDto(container.id)}
        onClose={() => setItemDialog(false)}
      />
    </Paper>
  );
}
