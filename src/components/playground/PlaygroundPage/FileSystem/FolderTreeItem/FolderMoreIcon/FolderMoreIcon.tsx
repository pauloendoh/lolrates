import Icons from "@/components/_common/Icons/Icons";
import useFileSystemStore from "@/hooks/zustand-stores/useFileSystemStore";
import FolderWithSubfoldersDto from "@/types/domain/playground/file-system/FolderWithSubfoldersDto";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

interface Props {
  folder: FolderWithSubfoldersDto;
}

export default function FolderMoreIcon({ folder }: Props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    setFileDialogParentFolderId,
    setOpenFolderDialog,
    setFolderDialogParentFolderId,
  } = useFileSystemStore();

  const handleOpenMore = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    setAnchorEl(null); // avoids error "The `anchorEl` prop provided to the component is invalid"
  };

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
      </Menu>
    </>
  );
}
