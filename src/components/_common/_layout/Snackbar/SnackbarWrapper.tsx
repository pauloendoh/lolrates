import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import useSnackbarStore from "../../../../hooks/zustand-stores/useSnackbarStore";
import S from "./SnackbarWrapper.styles";

// Zustand version!
const SnackbarWrapper = () => {
  const { successMessage, setSuccessMessage, errorMessage, setErrorMessage } =
    useSnackbarStore();

  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessage("");
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMessage("");
  };

  return (
    <S.Root>
      <Snackbar
        id="success-message"
        open={successMessage.length > 0}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        id="error-message"
        open={errorMessage.length > 0}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </S.Root>
  );
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default SnackbarWrapper;
