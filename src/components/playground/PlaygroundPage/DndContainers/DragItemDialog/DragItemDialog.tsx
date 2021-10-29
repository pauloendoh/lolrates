import useSaveDragItemMutation from "@/hooks/react-query/domain/playground/drag-item/useSaveDragItemMutation";
import { useMyEffect } from "@/hooks/useMyEffect";
import {
  DragItemDto,
  dragItemSchema,
} from "@/types/domain/playground/dnd/DragItemDto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import SaveCancelButtons from "../../../../_common/buttons/SaveCancelButton/SaveCancelButtons";
import MyTextField from "../../../../_common/inputs/MyTextField";

const DragItemDialog = (props: {
  open: boolean;
  initialValue: DragItemDto;
  onClose: () => void;
}) => {
  const { mutate: saveItem, isLoading } = useSaveDragItemMutation();

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<DragItemDto>({
    defaultValues: props.initialValue,
    resolver: yupResolver(dragItemSchema),
  });

  useMyEffect([props.open], () => {
    if (props.open) reset();
  });

  const onSubmit = (formData: DragItemDto) => {
    saveItem(formData, {
      onSuccess: props.onClose,
    });
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
        <DialogTitle id="drag-item-dialog-title">
          {watch("id") ? "Edit drag item" : "New drag item"}
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
                label="Drag item name"
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

export default DragItemDialog;
