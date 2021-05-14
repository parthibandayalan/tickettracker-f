import React, { Component, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/ducks/authentication";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Card,
  Typography,
  TextField,
  Paper,
  Avatar,
  Button,
  Grid,
  makeStyles,
  Link,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";

const initialValues = {
  username: "",
  password: "",
  remember: false,
};

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    height: "550px",
    width: 340,
    margin: "0 auto",
  },
  avatarStyle: { backgroundColor: "#1bbd7e" },
  btnstyle: { margin: "8px 0" },
  defaultbtnstyle: { margin: "8px 0" },
  cardStyle: { margin: "20px 0", padding: 20 },
});

export default function LoginComponent({ handleChange }) {
  let errorVisible = false;
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authenticated);

  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmit = (values, props) => {
    console.log("Submition Done");
    console.log(values);
    //dispatch(loginUser(values)).then(() => history.push("/") );
    dispatch(loginUser(values));
    errorVisible = true;
    console.log("dispatch done outside :" + auth);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const loginAs = (username, password) => {
    const values = {
      username,
      password,
    };
    dispatch(loginUser(values));
    errorVisible = true;
    console.log("dispatch done outside :" + auth);
  };

  useEffect(() => {
    console.log("use effect : " + auth);
    if (auth) history.push("/");
    else {
      errorVisible = true;
      console.log("value changed: " + errorVisible);
    }
  }, [auth]);

  console.log(classes);
  return (
    <Grid>
      <Paper className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" component={"span"}>
            Sign In
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Username"
                name="username"
                placeholder="Enter username"
                fullWidth
                required
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              {/* <Field
                  as={FormControlLabel}
                  name="remember"
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                /> */}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                className={classes.btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography>
          {" "}
          Do you have an account ?
          <Link onClick={() => handleChange("event", 1)}>Sign Up</Link>
        </Typography>
        <Card className={classes.cardStyle}>
          <Typography align="center"> Demo as</Typography>
          <Button
            type="submit"
            onClick={() => {
              loginAs("username1", "password1P@45");
            }}
            variant="contained"
            className={classes.defaultbtnstyle}
            fullWidth
          >
            Admin
          </Button>
          <Button
            type="submit"
            onClick={() => {
              loginAs("username4", "password1P@45");
            }}
            variant="contained"
            className={classes.defaultbtnstyle}
            fullWidth
          >
            Manager
          </Button>
          <Button
            type="submit"
            onClick={() => {
              loginAs("username2", "password2P$56");
            }}
            variant="contained"
            className={classes.defaultbtnstyle}
            fullWidth
          >
            Individual Contributor
          </Button>
        </Card>
      </Paper>
    </Grid>
  );
}
