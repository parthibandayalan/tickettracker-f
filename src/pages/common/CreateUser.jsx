import React from 'react';
import {  Card, CardContent, FormGroup, Typography, TextField, MenuItem, Box, Button } from '@material-ui/core';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import UserService from '../../services/UserService/UserService';
import * as Yup from 'yup';

const initialValues =  {
    username:'',
    password: "",
    confirmPassword: "",
    role:""
}

export default function CreateUser() {
    return (
        <div>
            <>
            <Card>
                <CardContent>
                    <Typography variant="h4">New User Account Creation</Typography>
                    <Formik
                        initialValues = {initialValues} 
                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('User Name is required').test("username","Username Exists already",(value, context) => {                                    
                                    //console.log(UserService.checkUsernameExist(value).then((response)=> Boolean(response) ));
                                    //return !( value === 'user1');
                                    return UserService.checkUsernameExist(value).then((response)=> !Boolean(response) );
                                }
                                ).min(6,'Username must be at least 6 characters').max(50,'Username must be less 50 characters'),
                            password: Yup.string()
                                .min(8, 'Password must be at least 8 characters').max(50,'Password must be less than 50 characters').matches(
                                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                                  ).required('Password is required'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('Confirm Password is required'),
                            role: Yup.string().required().oneOf(['Admin', 'Manager', 'Contributor']),
                        })}
                        onSubmit={ (values,formikHelpers) => {
                                UserService.createUser(values).then(response => response);
                        }}>

                        {({values,errors,isSubmitting,isValidating}) => (
                            <Form>
                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field required name="username" type="string" as={TextField} label="User Name" />
                                        <ErrorMessage name="username" />
                                    </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field required id="password" name="password" label="Password" as={TextField} type="password" autoComplete="current-password" />
                                        <ErrorMessage name="password" />
                                    </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field required id="confirmPassword" name="confirmPassword"  label="Confirm Password" as={TextField} type="password" autoComplete="current-password" />
                                        <ErrorMessage name="confirmPassword" />
                                    </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field
                                            name="role"
                                            label="Role"
                                            as={TextField}
                                            select
                                        >
                                            <MenuItem value="">Select ...</MenuItem>
                                            <MenuItem value="Admin">Admin</MenuItem>
                                            <MenuItem value="Manager">Manager</MenuItem>
                                            <MenuItem value="Contributor">Individual Contributor</MenuItem>
                                        </Field>
                                        <ErrorMessage name="dependents" />
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
        </>;
        </div>
    )
}
