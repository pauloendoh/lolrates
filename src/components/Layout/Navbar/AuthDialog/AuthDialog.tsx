import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Link,
  makeStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import useLoginMutation from "../../../../hooks/react-query/domain/auth/useLoginMutation";
import { newAuthData } from "../../../../types/domain/auth/IAuthData";
import { IResponseError } from "../../../../types/IResponseError";
import MyTextField from "../../../UI/MyInputs/MyTextField";
import Txt from "../../../UI/Text/Txt";

interface Props {
  open: boolean;
  // initialValue: DecisionDto
  onClose: () => void;
  // afterSave?: (returned: DecisionDto) => void
}

type FormType = "login" | "register";

const AuthDialog = (props: Props) => {
  // const history = useHistory()

  const handleClose = () => {
    props.onClose();
  };

  const [formType, setFormType] = useState<FormType>("login");
  const [responseErrors, setResponseErrors] = useState([] as IResponseError[]);
  const classes = useStyles();

  // const { mutate: postDecision } = usePostDecisionMutation()

  const handleSubmit = () => {
    // postDecision(values, {
    //     onSuccess: (data) => {
    //         props.setSuccessMessage("Decision saved!")
    //         handleClose()
    //         history.push(PATHS.BigDecisions.decision(data.id))
    //     },
    // })
  };

  const { mutate: login, isLoading } = useLoginMutation();

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="auth-dialog"
    >
      <Box pb={1} px={1}>
        <DialogContent>
          <Box>
            <Formik
              initialValues={newAuthData()}
              // PE 2/3 jogar pra fora
              onSubmit={(values, { setSubmitting }) => {
                if (
                  formType === "register" &&
                  values.password !== values.password2
                ) {
                  setResponseErrors([{ message: "Passwords don't match" }]);
                  setSubmitting(false);
                  return;
                }

                const authData = {
                  username: values.username,
                  email: values.email,
                  password: values.password,
                };

                const endpoint =
                  formType === "register" ? "/auth/register" : "/auth/login";

                setResponseErrors([]);
                if (formType === "login")
                  login(values, { onSuccess: () => props.onClose() });
                // axios.post<AuthUserGetDto>(endpoint, authData)
                //   .then((res) => {
                //     const authUser = res.data
                //     props.setAuthUser(authUser)

                //   })
                //   .catch((err: MyAxiosError) => {
                //     setResponseErrors(err.response.data.errors)
                //     setSubmitting(false)
                //   })
              }}
            >
              {({ handleChange, errors }) => (
                <Form className="d-flex flex-column">
                  <Box>
                    <MyTextField
                      id="email"
                      name="email"
                      className="mt-3"
                      type={formType === "register" ? "email" : "text"}
                      onChange={handleChange}
                      label={
                        formType === "register" ? "Email" : "Email or username"
                      }
                      fullWidth
                      required
                      InputLabelProps={{ required: false }}
                      autoFocus
                    />
                  </Box>

                  {formType === "register" ? (
                    <Box mt={1}>
                      <MyTextField
                        id="username"
                        name="username"
                        onChange={handleChange}
                        label="Username"
                        fullWidth
                        required
                        InputLabelProps={{ required: false }}
                      />
                    </Box>
                  ) : null}

                  <Box mt={1}>
                    <MyTextField
                      id="password"
                      type="password"
                      onChange={handleChange}
                      size="small"
                      label="Password"
                      className="mt-3"
                      fullWidth
                      required
                      InputLabelProps={{ required: false }}
                    />

                    {/* {formType === "login" && (
                      <Flex justifyContent="flex-end">
                        <Button
                          color="primary"
                          onClick={() => {
                            setFormType("passwordReset")
                          }}
                        >
                          Forgot your password?
                        </Button>
                      </Flex>
                    )} */}
                  </Box>

                  {formType === "register" ? (
                    <Box mt={1}>
                      <MyTextField
                        id="password2"
                        name="password2"
                        type="password"
                        onChange={handleChange}
                        label="Confirm password"
                        className="mt-3"
                        fullWidth
                        required
                        InputLabelProps={{ required: false }}
                      />
                    </Box>
                  ) : null}

                  <Box mt={2}>
                    <Button
                      id="auth-submit-button"
                      className={classes.button}
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                      style={{ textTransform: "none", fontSize: 16 }}
                      fullWidth
                    >
                      {formType === "register" ? "SIGN UP" : "SIGN IN"}
                      {isLoading && (
                        <CircularProgress size={20} className="ml-3" />
                      )}
                    </Button>
                  </Box>

                  {responseErrors.map((err, i) => (
                    <Box key={i} mt={1}>
                      <Txt color="error">{err.message}</Txt>
                    </Box>
                  ))}
                </Form>
              )}
            </Formik>

            <Box mt={3}>
              {formType === "register" ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                  Already have an account? &nbsp;{" "}
                  <Link
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      setResponseErrors([]);
                      setFormType("login");
                    }}
                  >
                    Sign in
                  </Link>
                </Box>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  Don't have an account? &nbsp;
                  <Link
                    href="#"
                    onClick={(e: any) => {
                      e.preventDefault();
                      setResponseErrors([]);
                      setFormType("register");
                    }}
                  >
                    Sign up
                  </Link>
                </Box>
              )}
            </Box>

            <Box mt={2}>
              {/* <MyDivider>
                <Box minWidth={30}>Or</Box>
              </MyDivider> */}

              {/* <Box mt={2}>
                <GoogleButton />
              </Box>

              <Box mt={1}>
                <Button
                  onClick={handleTempSignIn}
                  fullWidth
                  className={classes.testUserButton}
                  id="temp-user-btn"
                >
                  <FlexVCenter>
                    <AccessAlarmIcon fontSize="large" />
                    <Box ml={2} width={180}>
                      Test with Temporary User
                    </Box>
                  </FlexVCenter>
                </Button>
              </Box> */}
            </Box>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      width: 290,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 330,
    },
    [theme.breakpoints.up("md")]: {
      width: 400,
    },
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  googleButton: {
    paddingTop: 10,
    paddingBottom: 10,
    background: theme.palette.grey[800],
  },
  testUserButton: {
    paddingTop: 7,
    paddingBottom: 7,
    background: theme.palette.grey[800],
  },
}));

export default AuthDialog;
