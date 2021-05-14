import React, { useState } from "react";
import {
  Paper,
  Grid,
  FormGroup,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Avatar,
  Button,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import UserService from "../../services/UserService/UserService";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Notification from "../../components/Notification";

const initialValues = {
  fullname: "",
  username: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    width: 340,
    margin: "0 auto",
    height: "550px",
  },
  headerStyle: { margin: 0 },
  avatarStyle: { backgroundColor: "#1bbd7e" },
  marginTop: { marginTop: 5 },
  myTypography: {
    color: "#025f8c",
  },
  btnStyle: { margin: "8px 0" },
}));

export default function SignIn() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();
  return (
    <div align="center">
      <Paper className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Sign Up</Typography>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            fullname: Yup.string().required("Fullname is required"),
            username: Yup.string()
              .required("User Name is required")
              .test("username", "Username Exists already", (value, context) => {
                console.log("Check Username : " + value);
                //return !( value === 'user1');
                if (typeof value === "undefined") return true;
                return UserService.checkUsernameExist(value).then(
                  (response) => !Boolean(response)
                );
              })
              .min(6, "Username must be at least 6 characters")
              .max(50, "Username must be less 50 characters"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .max(50, "Password must be less than 50 characters")
              .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
              )
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
            role: Yup.string()
              .required()
              .oneOf(["Admin", "Manager", "Contributor"]),
          })}
          onSubmit={(values, formikHelpers) => {
            UserService.createUser(values)
              .then((response) =>
                setNotify({
                  isOpen: true,
                  message: "User Created Successfully",
                  type: "success",
                })
              )
              .catch(() =>
                setNotify({
                  isOpen: true,
                  message: "User Creation Failed",
                  type: "error",
                })
              );
            setTimeout(() => {
              formikHelpers.resetForm();
              formikHelpers.setSubmitting(false);
            }, 2000);
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>
              <FormGroup>
                <Field
                  required
                  name="fullname"
                  type="string"
                  as={TextField}
                  label="Full Name"
                />
                <ErrorMessage name="fullname" />
              </FormGroup>
              <FormGroup>
                <Field
                  required
                  name="username"
                  type="string"
                  as={TextField}
                  label="User Name"
                />
                <ErrorMessage name="username" />
              </FormGroup>
              <FormGroup>
                <Field
                  required
                  id="password"
                  name="password"
                  label="Password"
                  as={TextField}
                  type="password"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password" />
              </FormGroup>

              <FormGroup>
                <Field
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  as={TextField}
                  type="password"
                  autoComplete="current-password"
                />
                <ErrorMessage name="confirmPassword" />
              </FormGroup>
              <FormGroup>
                <FormControl component="fieldset" className={classes.marginTop}>
                  <FormLabel component="legend">Role</FormLabel>
                  <Field
                    as={RadioGroup}
                    aria-label="Role"
                    name="role"
                    style={{ display: "initial" }}
                  >
                    <FormControlLabel
                      value="Admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="Manager"
                      control={<Radio />}
                      label="Manager"
                    />
                    <FormControlLabel
                      value="Contributor"
                      control={<Radio />}
                      label="Individual Contributor"
                    />
                  </Field>
                </FormControl>
                <ErrorMessage name="role" />
              </FormGroup>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.btnStyle}
                fullWidth
                disabled={isSubmitting}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                type="reset"
                fullWidth
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
