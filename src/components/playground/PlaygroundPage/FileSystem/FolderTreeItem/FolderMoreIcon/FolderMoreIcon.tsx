import Icons from "@/components/_common/Icons/Icons";
import useDeleteFolder from "@/hooks/react-query/domain/playground/file-system/folder/useDeleteFolder";
import useFileSystemStore from "@/hooks/zustand-stores/useFileSystemStore";
import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";

interface Props {
  folder: FolderWithSubfoldersDto;
}

export default function FolderMoreIcon({ folder }: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mutate: deleteFolder } = useDeleteFolder();

  const {
    setFileDialogParentFolderId,
    setOpenFolderDialog,
    setFolderDialogParentFolderId,
  } = useFileSystemStore();

  const handleOpenMore = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null); // avoids error "The `anchorEl` prop provided to the component is invalid"
  };

  const theme = useTheme();

  return (
    <>
      <IconButton size="small" onClick={handleOpenMore}>
        <Icons.MoreHoriz />
      </IconButton>
      <Menu
        id="tag-more"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
      >
        <MenuItem
          onClick={(e) => {
            handleCloseMore(e);
            setFileDialogParentFolderId(folder.id);
          }}
        >
          <ListItemIcon style={{ width: 16 }}>
            <Icons.InsertDriveFile fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            New file
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            handleCloseMore(e);
            setOpenFolderDialog(true);
            setFolderDialogParentFolderId(folder.id);
          }}
        >
          <ListItemIcon style={{ width: 16 }}>
            <Icons.Folder fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            New folder
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            handleCloseMore(e);
            if (confirm("Delete folder and its files?")) {
              deleteFolder(folder.id);
            }
          }}
          style={{ color: theme.palette.error.main }}
        >
          <ListItemIcon style={{ width: 16 }}>
            <Icons.Delete fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Delete folder
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
