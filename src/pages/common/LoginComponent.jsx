import React, { Component ,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../../redux/ducks/authentication';
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  TextField,
  Paper,
  MenuItem,
  Box,
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
};

const useStyles = makeStyles({
  loginPaper: {
    height: "90vh",
  },
  buttonBlock: {
    width: "70%",
  },
});

export default function LoginComponent() {

  let errorVisible = false;
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authenticated); 

  useEffect(()=>{
  console.log("use effect : " + auth);
    if (auth) 
      history.push("/") ;
    else {
      errorVisible=true;
      console.log("value changed: "+errorVisible); 
    }
  },[auth])

  console.log(classes);
  return (
    <>
      <Grid container spacing={0} direction="row" justify="center">
        <Grid
          item
          container
          spacing={2}
          direction="column"
          xs={2}
          justify="center"
          className={classes.loginPaper}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={
              (values,formikHelpers) => {
                console.log("Submition Done");
                console.log(values);
                //dispatch(loginUser(values)).then(() => history.push("/") );
                dispatch(loginUser(values));
                errorVisible=true;
                console.log("dispatch done outside :"+ auth);     
              }
            }
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Paper
                variant="elevation"
                elevation={2}
                style={{
                  textAlign: "center",
                }}
              >
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  spacing={2}
                >
                  <Form>
                    <Grid item>
                      <Field
                        required
                        name="username"
                        type="string"
                        as={TextField}
                        label="Username"
                      />
                    </Grid>
                    <Grid item>
                      <ErrorMessage name="username" />
                    </Grid>
                    <Grid item>
                      <Field
                        required
                        name="password"
                        type="password"
                        as={TextField}
                        label="Password"
                      />
                    </Grid>
                    <Grid item>
                      <ErrorMessage name="password" />
                    </Grid>
                    <Grid item>
                      {!auth && errorVisible && <div>Invalid Username or password</div>}
                    </Grid>
                    <Grid item>
                      <Box marginBottom={2}>
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting || isValidating}
                          className={classes.buttonBlock}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                    {/* <Box marginBottom={2}>
                            <Button
                              variant="contained"
                              type="reset"
                              disabled={isSubmitting || isValidating}
                            >
                              Reset
                            </Button>
                          </Box> */}
                  </Form>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
              </Paper>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
}
