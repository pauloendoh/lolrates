import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import useSavePlayerMutation from "../../../../../hooks/react-query/domain/draft/useSavePlayerMutation";
import { PlayerDto } from "../../../../../types/domain/draft/PlayerDto";
import SaveCancelButtons from "../../../../UI/Buttons/SaveCancelButtons";
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
      <Box pb={1} px={1}>
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
                <Box>
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
                </Box>
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
      </Box>
    </Dialog>
  );
};

export default PlayerNameDialog;
