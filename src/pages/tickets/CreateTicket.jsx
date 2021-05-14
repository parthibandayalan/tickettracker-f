import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";
import ProjectService from "../../services/ProjectService/ProjectService";
import TicketService from "../../services/TicketService/TicketService";
import Notification from "../../components/Notification";
import { makeStyles } from "@material-ui/core/styles";

const initialValues = {
  title: "",
  description: "",
  severity: "",
  status: "",
  createdUser: "",
  projectId: "",
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

export default function CreateTicket() {
  const [projects, setProjects] = useState([]);
  const [createdBy, setCreatedBy] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  useEffect(() => {
    ProjectService.getAllProjects().then((response) => {
      //console.log(response);
      setProjects(response);
      //this.setState({ projects: response });
    });
    setCreatedBy(localStorage.getItem("username"));
  }, [projects.length]);

  return (
    <div align="center">
      <Card className={classes.table}>
        <CardContent>
          <Typography
            align="center"
            variant="h5"
            className={classes.myTypography}
          >
            New Ticket Creation
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .required("Title is required")
                .min(6, "Title must be at least 6 characters")
                .max(50, "Title must be less 50 characters"),
              description: Yup.string()
                .min(8, "Description must be at least 8 characters")
                .max(50, "Description must be less than 50 characters")
                .required("Description is required"),
              severity: Yup.string()
                .required("Please select a Severity")
                .oneOf(["Low", "Medium", "High"]),
              createdUser: Yup.string(),
              projectId: Yup.string().required(
                "Please select a Project to File Ticket under"
              ),
            })}
            onSubmit={(values, formikHelpers) => {
              values.createdUser = createdBy;
              values.status = "New";
              TicketService.createTicket(values)
                .then((response) =>
                  setNotify({
                    isOpen: true,
                    message: "Ticket Created Successfully",
                    type: "success",
                  })
                )
                .catch(() =>
                  setNotify({
                    isOpen: true,
                    message: "Ticket Creation Failed",
                    type: "error",
                  })
                );
              setTimeout(() => {
                formikHelpers.resetForm();
                formikHelpers.setSubmitting(false);
              }, 2000);
              //UserService.createUser(values).then(response => response) ? history.push('/login') : history.push('/error');
            }}
          >
            {({ values, errors, isSubmitting, isValidating }) => (
              <Form>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      name="title"
                      type="string"
                      as={TextField}
                      label="Ticket Title"
                    />
                    <ErrorMessage name="title">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      required
                      id="description"
                      name="description"
                      label="Description"
                      as={TextField}
                      type="description"
                      multiline
                    />
                    <ErrorMessage name="description">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                </Box>
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="severity"
                      label="Severity"
                      as={TextField}
                      select
                    >
                      <MenuItem value="">Select ...</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Field>
                    <ErrorMessage name="severity">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                </Box>
                {/* <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field
                                            name="status"
                                            label="Status"
                                            as={TextField}
                                            select
                                        >
                                            <MenuItem value="">Select ...</MenuItem>
                                            <MenuItem value="New">New</MenuItem>
                                            <MenuItem value="Assigned">Assigned</MenuItem>
                                            <MenuItem value="Open">Open</MenuItem>                               
                                            <MenuItem value="Investigation">Investigation</MenuItem>
                                            <MenuItem value="Resolved">Resolved</MenuItem>
                                            <MenuItem value="Closed">Closed</MenuItem>
                                        </Field>
                                        <ErrorMessage name="status" />
                                    </FormGroup>
                                    </Box> */}
                <Box marginBottom={2}>
                  <FormGroup>
                    <Field
                      name="projectId"
                      label="Project"
                      as={TextField}
                      select
                    >
                      <MenuItem value="">Select ...</MenuItem>
                      {projects.map((project) => (
                        <MenuItem value={project.id} key={project.id}>
                          {project.projectName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="projectId">
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
                {/* <pre>{JSON.stringify(errors, null, 4)}</pre>
                <pre>{JSON.stringify(values, null, 4)}</pre>
                <pre>{JSON.stringify(isSubmitting, null, 4)}</pre>
                <pre>{JSON.stringify(isValidating, null, 4)}</pre> */}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
