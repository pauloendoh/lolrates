import useDragContainersQuery from "@/hooks/react-query/domain/playground/drag-container/useDragContainersQuery";
import useFetchDragItems from "@/hooks/react-query/domain/playground/drag-item/useFetchDragItems";
import { newDragContainer } from "@/types/domain/playground/dnd/DragContainerDto";
import { Button, useTheme } from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { byNumber, byValue } from "sort-es";
import S from "./DndContainers.styles";
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
    <S.DndContainersRoot>
      <S.ContainersWrapper>
        {sortedContainers?.map((container, index) => (
          <DragContainer
            key={container.id}
            container={container}
            hasSpacingLeft={index !== 0}
          />
        ))}

        <Button
          variant="contained"
          color="primary"
          style={{
            minWidth: 150,
            marginLeft: theme.spacing(2),
            height: "fit-content",
          }}
          onClick={() => setContainerDialog(true)}
        >
          + New container
        </Button>
      </S.ContainersWrapper>

      <DragContainerDialog
        open={containerDialog}
        initialValue={newDragContainer()}
        onClose={() => setContainerDialog(false)}
      />
    </S.DndContainersRoot>
  );
}
