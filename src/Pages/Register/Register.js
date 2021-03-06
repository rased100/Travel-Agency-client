import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate();
    const { user, registerUser, isLoading, authError } = useAuth();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        // console.log(loginData)
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, navigate)
        e.preventDefault();
    }
    return (
        <Box sx={{ mt: 8 }} item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>Register
            </Typography>
            {!isLoading && <form onSubmit={handleLoginSubmit}>
                <TextField
                    sx={{ width: '50%', m: 1 }}
                    id="standard-basic"
                    label="Your Name"
                    name="name"
                    type="name"
                    onBlur={handleOnChange}
                    variant="standard" />
                <TextField
                    sx={{ width: '50%', m: 1 }}
                    id="standard-basic"
                    label="Your email"
                    name="email"
                    type="email"
                    onChange={handleOnChange}
                    variant="standard" /><br />
                <TextField
                    sx={{ width: '50%', m: 1 }}
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleOnChange}
                    autoComplete="current-password"
                    variant="standard"
                />
                <TextField
                    sx={{ width: '50%', m: 1 }}
                    id="standard-password-input"
                    label="Retype Your Password"
                    type="password"
                    name="password2"
                    onChange={handleOnChange}
                    autoComplete="current-password"
                    variant="standard"
                /> <br />
                <Button sx={{ width: '25%', m: 1 }} type="submit" variant="contained">Register</Button><br />
                <NavLink
                    style={{ textDecoration: 'none' }}
                    to="/login">
                    <Button variant="text">Already Registered? Please Login</Button>
                </NavLink>
            </form>}
            {isLoading && <CircularProgress />}

            <Box sx={{ width: '50%' }}>
                {
                    user?.email && <Alert severity="success">User created successfully !</Alert>
                }
                {
                    authError && <Alert severity="error">{authError}</Alert>
                }
            </Box>
        </Box>
    );
};

export default Register;