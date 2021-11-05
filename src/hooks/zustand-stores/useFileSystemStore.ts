import FileDto from "@/types/domain/playground/file-system/FileDto";
import create from "zustand";
import { devtools, NamedSet } from "zustand/middleware";

interface IFileSystemStore {
  fileDialogParentFolderId: number;
  setFileDialogParentFolderId: (parentFolderId: number) => void;

  openFolderDialog: boolean;
  setOpenFolderDialog: (open: boolean) => void;

  folderDialogParentFolderId: number;
  setFolderDialogParentFolderId: (parentFolderId: number) => void;

  selectedFile: FileDto;
  setSelectedFile: (file: FileDto) => void;

  expandedNodes: string[];
  toggleNode: (nodeId: string) => void;
}

const useFileSystemStore = create<IFileSystemStore>(
  devtools(
    (set: NamedSet<IFileSystemStore>, get) => ({
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

      selectedFile: null,
      setSelectedFile: (file) => {
        set({ selectedFile: file });
      },

      expandedNodes: [],
      toggleNode: (nodeId) => {
        const { expandedNodes } = get();
        if (expandedNodes.includes(nodeId))
          // remove
          set({
            expandedNodes: expandedNodes.filter(
              (expandedNodeId) => expandedNodeId !== nodeId
            ),
          });
        else {
          // add
          set({ expandedNodes: [...expandedNodes, nodeId] });
        }
      },
    }),
    "@FileSystemStore"
  )
);

export default useFileSystemStore;
