import SaveCancelButtons from "@/components/_common/buttons/SaveCancelButton/SaveCancelButtons";
import useSaveFile from "@/hooks/react-query/domain/playground/file-system/file/useSaveFile";
import FileDto from "@/types/domain/playground/file-system/FileDto";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MyTextField from "../../../../../../_common/inputs/MyTextField";

const FileDialog = (props: {
  open: boolean;
  initialValue: FileDto;
  onClose: () => void;
}) => {
  const { mutate, isLoading } = useSaveFile();

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FileDto>({
    defaultValues: props.initialValue,
  });

  useEffect(() => {
    if (props.open && props.initialValue) reset(props.initialValue);
  }, [props.open, props.initialValue]);

  const onSubmit = (formData: FileDto) => {
    console.log(formData);

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
      aria-labelledby="file-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="file-dialog-title">
          {watch("id") ? "Edit file" : "New file"}
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
                label="File name"
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

export default FileDialog;
