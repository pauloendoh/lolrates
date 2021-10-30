import Flex from "@/components/_common/flexboxes/Flex";
import useFetchDragItems from "@/hooks/react-query/domain/playground/drag-item/useFetchDragItems";
import { newDragContainer } from "@/types/domain/playground/dnd/DragContainerDto";
import { Box, Button, CircularProgress, useTheme } from "@material-ui/core";
import useDragContainersQuery from "hooks/react-query/domain/playground/useDragContainersQuery";
import React, { useMemo, useState } from "react";
import { byNumber, byValue } from "sort-es";
import DragContainer from "./DragContainer/DragContainer";
import DragContainerDialog from "./DragContainerDialog/DragContainerDialog";

export default function DndContainers() {
  const [containerDialog, setContainerDialog] = useState(false);

  const { data: containers } = useDragContainersQuery();

  // required for windows on focus after moving items between containers
  const { data: items, isFetching } = useFetchDragItems();

  const theme = useTheme();

  const sortedContainers = useMemo(() => {
    if (containers) {
      return containers.sort(
        byValue((container) => container.position, byNumber())
      );
    }
    return [];
  }, [containers, items]);

  return (
    <Box style={{ overflowX: "auto" }} position="relative">
      {isFetching && (
        <div // maybe this can become a component
          style={{
            position: "absolute",
            background: "#15151599",
            width: "100%",
            height: "100%",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}

      <Flex style={{ gap: theme.spacing(2), marginBottom: theme.spacing(2) }}>
        {sortedContainers?.map((container) => (
          <DragContainer key={container.id} container={container} />
        ))}

        <Button
          variant="contained"
          color="primary"
          style={{ minWidth: 150 }}
          onClick={() => setContainerDialog(true)}
        >
          + New container
        </Button>
      </Flex>

      <DragContainerDialog
        open={containerDialog}
        initialValue={newDragContainer()}
        onClose={() => setContainerDialog(false)}
      />
    </Box>
  );
}
