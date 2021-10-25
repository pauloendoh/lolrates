import useSaveDragContainerMutation from "@/hooks/react-query/domain/playground/useSaveDragContainerMutation";
import {
  DragContainerDto,
  dragContainerSchema,
} from "@/types/domain/playground/dnd/DragContainerDto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import SaveCancelButtons from "../../../../_common/buttons/SaveCancelButton/SaveCancelButtons";
import MyTextField from "../../../../_common/inputs/MyTextField";

const DragContainerDialog = (props: {
  open: boolean;
  initialValue: DragContainerDto;
  onClose: () => void;
}) => {
  const { mutate: saveContainer, isLoading } = useSaveDragContainerMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<DragContainerDto>({
    defaultValues: props.initialValue,
    resolver: yupResolver(dragContainerSchema),
  });

  const onSubmit = (formData: DragContainerDto) => {
    console.log(formData);
    saveContainer(formData);
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="auth-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="drag-container-dialog-title">
          {watch("id") ? "Edit drag container" : "New drag container"}
        </DialogTitle>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <MyTextField
                id="name"
                {...field}
                size="small"
                label="Drag container name"
                className="mt-3"
                fullWidth
                autoFocus
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            )}
          />
        </DialogContent>
        <DialogTitle>
          <SaveCancelButtons disabled={isLoading} onCancel={props.onClose} />
        </DialogTitle>
      </form>
    </Dialog>
  );
};

export default DragContainerDialog;
