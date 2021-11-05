import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import useFetchFolders from "@/hooks/react-query/domain/playground/file-system/folder/useFetchFolders";
import useSaveFolder from "@/hooks/react-query/domain/playground/file-system/folder/useSaveFolder";
import useFileSystemStore from "@/hooks/zustand-stores/useFileSystemStore";
import { newFileDto } from "@/types/domain/playground/file-system/FileDto";
import {
  newFolderDto,
  partialFolderDto,
} from "@/types/domain/playground/file-system/FolderDto";
import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import { IconButton, useTheme } from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import React, { useMemo, useRef } from "react";
import { useDrop } from "react-dnd";
import { byString, byValue } from "sort-es";
import FolderDialog from "./FolderDialog/FolderDialog";
import FileDialog from "./FolderTreeItem/FolderMoreIcon/FileDialog/FileDialog";
import FolderTreeItem from "./FolderTreeItem/FolderTreeItem";

export default function FileSystem() {
  const {
    fileDialogParentFolderId,
    setFileDialogParentFolderId,

    openFolderDialog,
    setOpenFolderDialog,
    folderDialogParentFolderId,
    setFolderDialogParentFolderId,
  } = useFileSystemStore();

  const { data: userFolders } = useFetchFolders();

  const sortedFolders = useMemo(() => {
    if (userFolders?.length > 0) {
      return userFolders.sort(byValue((folder) => folder.name, byString()));
    }
    return [];
  }, [userFolders]);

  const { mutate: saveFolder } = useSaveFolder();
  const [{ isHovering: folderIsHovering }, dropFolderRef] = useDrop({
    accept: "folder",

    drop(draggedFolder: FolderWithSubfoldersDto) {
      saveFolder(
        partialFolderDto({
          id: draggedFolder.id,
          name: draggedFolder.name,
          parentFolderId: null,
        })
      );
    },
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
  });

  const htmlDropRef = useRef<HTMLDivElement>();
  dropFolderRef(htmlDropRef);

  const { selectedFile, expandedNodes, toggleNode } = useFileSystemStore();

  const theme = useTheme();
  return (
    <Flex style={{ gap: theme.spacing(4) }}>
      <TreeView
        defaultCollapseIcon={<Icons.ExpandMore />}
        defaultExpandIcon={<Icons.ChevronRight />}
        style={{ width: 300 }}
        expanded={expandedNodes}
      >
        <TreeItem
          nodeId="root"
          onClick={(e) => {
            e.preventDefault();
            toggleNode("root");
          }}
          label={
            <div
              ref={htmlDropRef}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: folderIsHovering
                  ? theme.palette.grey[600]
                  : undefined,
              }}
            >
              <Txt>ROOT</Txt>
              <FlexVCenter>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    // impede o toggle
                    e.preventDefault();
                    setOpenFolderDialog(true);
                  }}
                >
                  <Icons.CreateNewFolder fontSize="small" />
                </IconButton>
              </FlexVCenter>
            </div>
          }
        >
          {sortedFolders.map((folder) => (
            <FolderTreeItem folder={folder} key={folder.id} />
          ))}
        </TreeItem>
      </TreeView>

      <Flex>
        <Txt variant="h6">{selectedFile?.name}</Txt>
      </Flex>

      <FolderDialog
        open={openFolderDialog}
        initialValue={newFolderDto(folderDialogParentFolderId)}
        onClose={() => setOpenFolderDialog(false)}
      />

      <FileDialog
        open={!!fileDialogParentFolderId}
        initialValue={newFileDto(fileDialogParentFolderId)}
        onClose={() => setFileDialogParentFolderId(null)}
      />
    </Flex>
  );
}
