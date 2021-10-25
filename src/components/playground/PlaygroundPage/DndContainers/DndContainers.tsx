import { newDragContainer } from "@/types/domain/playground/dnd/DragContainerDto";
import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import DragContainerDialog from "./DragContainerDialog/DragContainerDialog";

export default function DndContainers() {
  const [containerDialog, setContainerDialog] = useState(false);

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setContainerDialog(true)}
      >
        + New container
      </Button>

      <DragContainerDialog
        open={containerDialog}
        initialValue={newDragContainer(0)}
        onClose={() => setContainerDialog(false)}
      />
    </Box>
  );
}
