import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../interceptors'

const Register = () => {
    const navigate = useNavigate();
    const initialValues = {
        name : '',
        email: '',
        password: '',
        phone:''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Enter Name"),
        email: Yup.string().email('Invalid email address').required('Enter Email'),
        password: Yup.string().required('Enter Password'),
        phone: Yup.number().required('Enter Password'),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await axiosInstance.post('/users', values);
            console.log(response, 'response');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response) {
                setFieldError('email', 'Invalid credentials');
            } else {
                setFieldError('email', 'An error occurred');
            }
        }
        setSubmitting(false);
    };

    return (
        <Stack sx={{
            display: "flex",
            justifyContent: "center",
            width: '30%',
            margin: "auto",
            padding:"60px",
            border:'1px solid #d7dbe3',
            borderRadius:"5px"
        }}>
            <Typography variant='h5' sx={{textAlign:"center"}}>Register</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <Stack mt={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                size='small'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                            />
                        </Stack>
                        <Stack mt={2}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                size='small'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                            />
                        </Stack>
                        <Stack mt={2}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                size='small'
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                            />
                        </Stack>
                        <Stack mt={2}>
                            <TextField
                                id="passphoneword"
                                name="phone"
                                label="Phone"
                                variant="outlined"
                                size='small'
                                type="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                            />
                        </Stack>
                        <Stack mt={2}>
                            <Button variant="contained" type="submit" disabled={isSubmitting}>Register</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

export default Register;
