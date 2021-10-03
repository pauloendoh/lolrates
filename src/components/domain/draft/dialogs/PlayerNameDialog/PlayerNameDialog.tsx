import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import useSavePlayerMutation from "../../../../../hooks/react-query/domain/draft/useSavePlayerMutation";
import { PlayerDto } from "../../../../../types/domain/draft/PlayerDto";
import SaveCancelButtons from "../../../../UI/buttons/SaveCancelButton/SaveCancelButtons";
import MyTextField from "../../../../UI/MyInputs/MyTextField";

const PlayerNameDialog = (props: {
  open: boolean;
  initialValue: PlayerDto;
  onClose: () => void;
}) => {
  const { mutate: savePlayer, isLoading } = useSavePlayerMutation();

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="auth-dialog"
    >
      <Formik
        enableReinitialize
        initialValues={props.initialValue}
        onSubmit={(formikValues) => {
          savePlayer(formikValues, {
            onSettled: () => {
              props.onClose();
            },
          });
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <DialogTitle id="player-dialog-title">
              {values.id ? "Edit player" : "New player"}
            </DialogTitle>
            <DialogContent>
              <MyTextField
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                size="small"
                label="Player name"
                className="mt-3"
                fullWidth
                required
                autoFocus
              />
            </DialogContent>
            <DialogTitle>
              <SaveCancelButtons
                disabled={isLoading}
                onCancel={props.onClose}
              />
            </DialogTitle>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PlayerNameDialog;
