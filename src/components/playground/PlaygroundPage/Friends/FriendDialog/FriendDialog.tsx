import SaveCancelButtons from "@/components/_common/buttons/SaveCancelButton/SaveCancelButtons";
import MyTextField from "@/components/_common/inputs/MyTextField";
import useSaveFriend from "@/hooks/react-query/domain/playground/friends/useSaveFriend";
import FriendDto from "@/types/domain/playground/FriendDto";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const FriendDialog = (props: {
  open: boolean;
  initialValue: FriendDto;
  onClose: () => void;
}) => {
  const { mutate, isLoading } = useSaveFriend();

  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FriendDto>({
    defaultValues: props.initialValue,
  });

  useEffect(() => {
    if (props.open && props.initialValue) reset(props.initialValue);
  }, [props.open, props.initialValue]);

  const onSubmit = (formData: FriendDto) => {
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
      aria-labelledby="friend-dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="friend-dialog-title">
          {watch("id") ? "Edit friend" : "New friend"}
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
                label="Friend name"
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

export default FriendDialog;
