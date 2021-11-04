import SaveCancelButtons from "@/components/_common/buttons/SaveCancelButton/SaveCancelButtons";
import useSaveFolder from "@/hooks/react-query/domain/playground/file-system/folder/useSaveFolder";
import FolderDto from "@/types/domain/playground/file-system/FolderDto";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MyTextField from "../../../../_common/inputs/MyTextField";
const FolderDialog = (props: {
  open: boolean;
  initialValue: FolderDto;
  onClose: () => void;
}) => {
  const { mutate, isLoading } = useSaveFolder();

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FolderDto>({
    defaultValues: props.initialValue,
  });

  useEffect(() => {
    if (props.open && props.initialValue) reset(props.initialValue);
  }, [props.open, props.initialValue]);

  const onSubmit = (formData: FolderDto) => {
    mutate(formData, {
      onSuccess: props.onClose,
    });
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="folder-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="folder-dialog-title">
          {watch("id") ? "Edit folder" : "New folder"}
        </DialogTitle>
        <DialogContent>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <MyTextField
                id="name"
                {...field}
                required
                size="small"
                label="Folder name"
                className="mt-3"
                fullWidth
                autoFocus
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

export default FolderDialog;
