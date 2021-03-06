import FileDto from "./FileDto";

export default interface FolderWithSubfoldersDto {
  id: number;

  userId: number;

  name: string;

  subfolders: FolderWithSubfoldersDto[];

  parentFolder: FolderWithSubfoldersDto;

  files: FileDto[];
}
