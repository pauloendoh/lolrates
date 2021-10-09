import S from './MySnackbar.styles'
import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles, Theme } from "@material-ui/core/styles"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import React from "react"
import useSnackbarStore from "../../../hooks/zustand-stores/useSnackbarStore"

// Zustand version! 
const MySnackbar = () => {

  const {
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
  } = useSnackbarStore()

  const handleCloseSuccess = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setSuccessMessage("")
  }

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setErrorMessage("")
  }

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
  )
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}


export default MySnackbar
