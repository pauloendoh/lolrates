import * as yup from "yup";
import { DragItemDto } from "./DragItemDto";

export interface DragContainerDto {
  id: number;
  userId: number;

  dragItems?: DragItemDto[];

  name: string;

  position: number;
}

export const newDragContainer = (): DragContainerDto => ({
  id: null,
  userId: null,
  name: "",
  position: null,
});

export const dragContainerSchema: yup.SchemaOf<DragContainerDto> = yup.object({
  id: yup.number().nullable().notRequired(),
  userId: yup.number().nullable().notRequired(),
  dragItems: yup.array(),
  name: yup.string().required("Container name is required"),
  position: yup.number().nullable().notRequired(),
});
