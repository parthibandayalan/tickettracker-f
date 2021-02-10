import React,{ useEffect,useState } from 'react';
import {  Card, CardContent, FormGroup, Typography, TextField, MenuItem, Box, Button } from '@material-ui/core';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import ProjectService from '../../services/ProjectService/ProjectService';
import * as Yup from 'yup';

const initialValues =  {
    projectName:'',
    projectDescription: "" 
}

export default function CreateProject() {

    const [createdBy,setCreatedBy] = useState(null);

    useEffect(() => {        
        setCreatedBy(localStorage.getItem('username'));
    },[]);

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h4">New Project Creation</Typography>
                    <Formik

                    initialValues = {initialValues} 
                    validationSchema={
                        Yup.object().shape({
                            projectName:Yup.string().required("Project Nanme is Required").min(6,'Project Name must be at least 6 characters')
                            .max(50,'Username must be less 50 characters'),
                            projectDescription:Yup.string().required("Project Description is Required")
                            .min(10,'Project description should be atleast 10 characters long')
                            .max(100,'Project Description should be less than 100 characters long')
                        })
                    }
                    onSubmit={ (values,formikHelpers) => {
                        values.projectManager = createdBy;
                        ProjectService.createProject(values).then(response => response) ;
                        console.log(values);
                    }}
                    >

                        {({values,errors,isSubmitting,isValidating}) => (
                            <Form>
                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field required name="projectName" type="string" as={TextField} label="Project Name" />
                                        <ErrorMessage name="projectName" />
                                    </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field required id="projectDescription" name="projectDescription" label="Project Description" as={TextField} type="string"  />
                                        <ErrorMessage name="projectDescription" />
                                    </FormGroup>
                                    </Box>                                                                        
                                    <Box marginBottom={2}><Button variant="contained" type="submit" disabled={isSubmitting || isValidating}>Submit</Button></Box>
                                    <Box marginBottom={2}><Button variant="contained" type="reset" disabled={isSubmitting || isValidating}>Reset</Button></Box>                                    
                                    <pre>{JSON.stringify(errors, null, 4)}</pre>
                                    <pre>{JSON.stringify(values, null, 4)}</pre>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}
