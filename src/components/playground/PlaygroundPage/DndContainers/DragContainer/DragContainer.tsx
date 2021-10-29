import Flex from "@/components/_common/flexboxes/Flex";
import Txt from "@/components/_common/text/Txt";
import useFetchDragItemsByContainer from "@/hooks/react-query/domain/playground/drag-item/useFetchDragItemsByContainer";
import { DragContainerDto } from "@/types/domain/playground/dnd/DragContainerDto";
import { newDragItemDto } from "@/types/domain/playground/dnd/DragItemDto";
import { Box, Button, Paper, useTheme } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import DragItemDialog from "../DragItemDialog/DragItemDialog";
import DragItem from "./DragItem/DragItem";

export default function DragContainer({
  container,
}: {
  container: DragContainerDto;
}) {
  const [itemDialog, setItemDialog] = useState(false);

  const { data: dragItems } = useFetchDragItemsByContainer(container.id);

  const orderedDragItems = useMemo(() => {
    if (dragItems?.length > 0) {
      return dragItems.sort((a, b) => a.position - b.position);
    }
    return [];
  }, [dragItems]);

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

      <Button onClick={() => setItemDialog(true)}>+ Add item</Button>

      <DragItemDialog
        open={itemDialog}
        initialValue={newDragItemDto(container.id)}
        onClose={() => setItemDialog(false)}
      />
    </Paper>
  );
}
