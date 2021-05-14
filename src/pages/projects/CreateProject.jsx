import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import ProjectService from "../../services/ProjectService/ProjectService";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import Notification from "../../components/Notification";

const initialValues = {
  projectName: "",
  projectDescription: "",
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
    maxWidth: 650,
  },
  myTypography: {
    color: "#025f8c",
  },
}));

export default function CreateProject() {
  const [createdBy, setCreatedBy] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isValidating, setIsValidating] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setCreatedBy(localStorage.getItem("username"));
  }, []);

  return (
    <div align="center">
      <Card className={classes.table}>
        <CardContent>
          <Typography
            className={classes.myTypography}
            align="center"
            variant="h5"
          >
            New Project Creation
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              projectName: Yup.string()
                .required("Project Name is Required")
                .min(6, "Project Name must be at least 6 characters")
                .max(50, "Username must be less 50 characters"),
              projectDescription: Yup.string()
                .required("Project Description is Required")
                .min(
                  10,
                  "Project description should be atleast 10 characters long"
                )
                .max(
                  100,
                  "Project Description should be less than 100 characters long"
                ),
            })}
            onSubmit={(values, formikHelpers) => {
              values.projectManager = createdBy;
              ProjectService.createProject(values)
                .then((response) => {
                  setNotify({
                    isOpen: true,
                    message: "Project Created Successfully",
                    type: "success",
                  });
                })
                .catch(() =>
                  setNotify({
                    isOpen: true,
                    message: "Project Creation Failed",
                    type: "error",
                  })
                );
              setTimeout(() => {
                formikHelpers.resetForm();
                formikHelpers.setSubmitting(false);
              }, 2000);
              //console.log(formikHelpers);
            }}
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Form>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      name="projectName"
                      type="string"
                      as={TextField}
                      label="Project Name"
                    />
                    <ErrorMessage name="projectName">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      id="projectDescription"
                      name="projectDescription"
                      label="Project Description"
                      as={TextField}
                      type="string"
                    />
                    <ErrorMessage name="projectDescription">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting || isValidating}
                  >
                    Submit
                  </Button>
                </Box>
                <Box marginBottom={2}>
                  <Button
                    variant="contained"
                    type="reset"
                    disabled={isSubmitting || isValidating}
                  >
                    Reset
                  </Button>
                </Box>
                {/*<pre>{JSON.stringify(errors, null, 4)}</pre>
                <pre>{JSON.stringify(values, null, 4)}</pre>
                <pre>{JSON.stringify(isSubmitting, null, 4)}</pre>
            <pre>{JSON.stringify(isValidating, null, 4)}</pre>*/}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
