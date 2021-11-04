import create from "zustand";
import { devtools, NamedSet } from "zustand/middleware";

interface IFileSystemStore {
  fileDialogParentFolderId: number;
  setFileDialogParentFolderId: (parentFolderId: number) => void;

  openFolderDialog: boolean;
  setOpenFolderDialog: (open: boolean) => void;

  folderDialogParentFolderId: number;
  setFolderDialogParentFolderId: (parentFolderId: number) => void;
}

const useFileSystemStore = create<IFileSystemStore>(
  devtools(
    (set: NamedSet<IFileSystemStore>) => ({
      fileDialogParentFolderId: null,
      setFileDialogParentFolderId: (parentFolderId) => {
        set({ fileDialogParentFolderId: parentFolderId });
      },

      openFolderDialog: false,
      setOpenFolderDialog: (open) => {
        set({ openFolderDialog: open });

        if (open === false) set({ folderDialogParentFolderId: null });
      },

      folderDialogParentFolderId: null,
      setFolderDialogParentFolderId: (parentFolderId) => {
        set({ folderDialogParentFolderId: parentFolderId });
      },
    }),
    "@FileSystemStore"
  )
);

export default useFileSystemStore;
