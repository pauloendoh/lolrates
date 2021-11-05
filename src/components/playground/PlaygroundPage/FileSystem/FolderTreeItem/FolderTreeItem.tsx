import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import useSaveFile from "@/hooks/react-query/domain/playground/file-system/file/useSaveFile";
import useSaveFolder from "@/hooks/react-query/domain/playground/file-system/folder/useSaveFolder";
import useFileSystemStore from "@/hooks/zustand-stores/useFileSystemStore";
import FileDto from "@/types/domain/playground/file-system/FileDto";
import { partialFolderDto } from "@/types/domain/playground/file-system/FolderDto";
import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import { useTheme } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
import React, { useMemo, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { byString, byValue } from "sort-es";
import FileTreeItem from "./FileTreeItem/FileTreeItem";
import FolderMoreIcon from "./FolderMoreIcon/FolderMoreIcon";

interface Props {
  folder: FolderWithSubfoldersDto;
}

export default function FolderTreeItem({ folder }: Props) {
  const [hover, setHover] = useState(false);
  const { mutate: saveFile } = useSaveFile();
  const { mutate: saveFolder } = useSaveFolder();

  const { toggleNode } = useFileSystemStore();

  const theme = useTheme();

  const sortedFiles = useMemo(() => {
    if (folder.files?.length > 0) {
      return folder.files.sort(byValue((file) => file.name, byString()));
    }
    return [];
  }, [folder.files]);

  const [{}, dragFolderRef] = useDrag({
    type: "folder",
    item: folder,
    collect: (monitor) => ({}),
  });

  const sortedSubfolders = useMemo(() => {
    if (folder.subfolders?.length > 0) {
      return folder.subfolders.sort(byValue((file) => file.name, byString()));
    }
    return [];
  }, [folder.subfolders]);

  const hasChildren = useMemo(() => {
    return sortedFiles.length + sortedSubfolders.length > 0;
  }, [sortedFiles, sortedSubfolders]);

  const [{ isHovering: fileIsHovering }, dropFileRef] = useDrop({
    accept: "file",

    drop(file: FileDto) {
      file.parentFolderId = folder.id;
      saveFile(file);
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  });

  const [{ isHovering: folderIsHovering }, dropFolderRef] = useDrop({
    accept: "folder",

    drop(draggedFolder: FolderWithSubfoldersDto) {
      saveFolder(
        partialFolderDto({
          id: draggedFolder.id,
          name: draggedFolder.name,
          parentFolderId: folder.id,
        })
      );
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  });

  const htmlDropFileRef = useRef<HTMLDivElement>();

  dropFolderRef(dragFolderRef(dropFileRef(htmlDropFileRef)));

  return (
    <TreeItem
      nodeId={folder.id.toString()}
      onClick={(e) => {
        e.preventDefault();

        if (folder.files.length > 0 || folder.subfolders.length > 0)
          toggleNode(folder.id.toString());
      }}
      label={
        <div
          ref={htmlDropFileRef}
          style={{
            background:
              fileIsHovering || folderIsHovering
                ? theme.palette.grey[600]
                : undefined,
          }}
        >
          <FlexVCenter
            style={{
              justifyContent: "space-between",
              minHeight: 30,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <FlexVCenter style={{ gap: theme.spacing(1) }}>
              <Icons.Folder fontSize="small" />
              <Txt variant="body2">{folder.name}</Txt>
            </FlexVCenter>

            {hover && <FolderMoreIcon folder={folder} />}
          </FlexVCenter>
        </div>
      }
    >
      {hasChildren && (
        <>
          {sortedSubfolders.map((subfolder) => (
            <FolderTreeItem key={subfolder.id} folder={subfolder} />
          ))}
          {sortedFiles.map((file) => (
            <FileTreeItem key={file.id} file={file} />
          ))}
        </>
      )}
    </TreeItem>
  );
}
