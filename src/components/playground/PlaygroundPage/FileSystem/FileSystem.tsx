import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import useFetchFolders from "@/hooks/react-query/domain/playground/file-system/folder/useFetchFolders";
import useFileSystemStore from "@/hooks/zustand-stores/useFileSystemStore";
import { newFileDto } from "@/types/domain/playground/file-system/FileDto";
import { newFolderDto } from "@/types/domain/playground/file-system/FolderDto";
import { IconButton, useTheme } from "@material-ui/core";
import { TreeView } from "@material-ui/lab";
import React, { useMemo } from "react";
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

  const theme = useTheme();
  return (
    <Flex
      style={{ flexDirection: "column", width: 300, gap: theme.spacing(2) }}
    >
      <FlexVCenter justifyContent="space-between">
        <Txt>ROOT</Txt>
        <FlexVCenter>
          <IconButton size="small" onClick={() => setOpenFolderDialog(true)}>
            <Icons.CreateNewFolder fontSize="small" />
          </IconButton>
        </FlexVCenter>
      </FlexVCenter>
      <TreeView
        defaultCollapseIcon={<Icons.ExpandMore />}
        defaultExpandIcon={<Icons.ChevronRight />}
      >
        {sortedFolders.map((folder) => (
          <FolderTreeItem folder={folder} key={folder.id} />
        ))}
      </TreeView>

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
