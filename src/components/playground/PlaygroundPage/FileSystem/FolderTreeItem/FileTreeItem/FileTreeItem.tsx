import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import FileDto from "@/types/domain/playground/file-system/FileDto";
import { useTheme } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import React, { useRef } from "react";
import { useDrag } from "react-dnd";

interface Props {
  file: FileDto;
}

export interface DndFile {
  id: number;
  parentFolderId: number;
}

export default function FileTreeItem({ file }: Props) {
  const theme = useTheme();

  const [{}, dragFileRef] = useDrag({
    type: "file",
    item: file,
    collect: (monitor) => ({}),
  });

  const htmlDragFileRef = useRef<HTMLDivElement>();
  dragFileRef(htmlDragFileRef);

  return (
    <TreeItem
      ref={htmlDragFileRef}
      nodeId={file.parentFolderId.toString() + "-" + file.id.toString()}
      label={
        <FlexVCenter style={{ justifyContent: "space-between", minHeight: 30 }}>
          <FlexVCenter style={{ gap: theme.spacing(1) }}>
            <Icons.InsertDriveFileOutlined fontSize="small" />
            <Txt variant="body2">{file.name}</Txt>
          </FlexVCenter>
        </FlexVCenter>
      }
    />
  );
}
