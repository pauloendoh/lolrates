import * as yup from "yup";

export interface DragItemDto {
  id: number;
  userId: number;
  containerId: number;
  name: string;
  position: number;
}

export const newDragItemDto = (containerId: number): DragItemDto => ({
  id: null,
  userId: null,
  containerId,
  name: "",
  position: null,
});

export const dragItemSchema: yup.SchemaOf<DragItemDto> = yup.object({
  id: yup.number().nullable().notRequired(),
  userId: yup.number().nullable().notRequired(),
  containerId: yup.number().nullable().notRequired(),
  name: yup.string().required("Container name is required"),
  position: yup.number().nullable().notRequired(),
});
