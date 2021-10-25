import * as yup from "yup";

export interface DragContainerDto {
  id: number;
  userId: number;

  // dragItems: DragItem[];

  name: string;

  position: number;
}

export const newDragContainer = (position: number): DragContainerDto => ({
  id: null,
  userId: null,
  name: "",
  position,
});

export const dragContainerSchema: yup.SchemaOf<DragContainerDto> = yup.object({
  id: yup.number().nullable().notRequired(),
  userId: yup.number().nullable().notRequired(),
  name: yup.string().required("Container name is required"),
  position: yup.number().required(),
});
