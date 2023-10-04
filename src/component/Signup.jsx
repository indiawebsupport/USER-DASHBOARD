import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import allBackendService from '../service/allBackendService';

const defaultTheme = createTheme();

export default function Signup(props) {


    let [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        country: "",
        city: "",
        states: "",
        age: "",
        zip: "",
        roles: "",
        secretQuestion: "",
        answer: "",

    })

    let [question] = useState([
        { id: 1, questionName: "What is your favorite movie" },
        { id: 2, questionName: "What is your favorite food" },
        { id: 3, questionName: "What is your favorite actor" },
        { id: 4, questionName: "What is your favorite cricketer" },


    ]);

    let [roles] = useState([
        { id: 1, roleName: "Customer" },
        { id: 2, roleName: "Admin" },



    ]);

    let onRegisterClick = (event) => {
        event.preventDefault();
        let data = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,

            age: state.age,
            answer: state.answer,
            mobile: state.mobile,

            address: {
                city: state.city,
                state: state.states,
                zip: state.zip,
                country: state.country,

            },
            secretQuestion: state.secretQuestion,
            roles: state.roles
        }
        console.log(data);
        allBackendService.createSignup(data).then(res => {
            alert("Register Successfully !!!!");
            props.history.push('/login');



        }, error => {
            console.log(error.response.data.message)
            alert(error.response.data.message[0])
        })


    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 2,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={state.firstName}
                                        onChange={(event) => {
                                            setState({ ...state, firstName: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={state.lastName}
                                        onChange={(event) => {
                                            setState({ ...state, lastName: event.target.value })
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={state.email}
                                        onChange={(event) => {
                                            setState({ ...state, email: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={state.password}
                                        onChange={(event) => {
                                            setState({ ...state, password: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="age"
                                        label="Age"
                                        type="number"
                                        id="age"
                                        value={state.age}
                                        onChange={(event) => {
                                            setState({ ...state, age: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="city"
                                        label="City"
                                        type="text"
                                        id="city"
                                        value={state.city}
                                        onChange={(event) => {
                                            setState({ ...state, city: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="state"
                                        label="State"
                                        type="text"
                                        id="state"
                                        value={state.states}
                                        onChange={(event) => {
                                            setState({ ...state, states: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="country"
                                        label="Country"
                                        type="text"
                                        id="country"
                                        value={state.country}
                                        onChange={(event) => {
                                            setState({ ...state, country: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="zip"
                                        label="Zip code"
                                        type="number"
                                        id="zip"
                                        value={state.zip}
                                        onChange={(event) => {
                                            setState({ ...state, zip: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="mobile"
                                        label="Mobile"
                                        type="number"
                                        id="mobile"
                                        value={state.mobile}
                                        onChange={(event) => {
                                            setState({ ...state, mobile: event.target.value })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.roles}
                                            label="Roles"
                                            onChange={(event) => {
                                                setState({ ...state, roles: event.target.value });
                                            }}

                                        >
                                            {roles.map((role) => (
                                                <MenuItem key={role.id} value={role.roleName}>
                                                    {role.roleName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Question</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.secretQuestion}
                                            label="What is your favorite question"
                                            onChange={(event) => {
                                                setState({ ...state, secretQuestion: event.target.value });
                                            }} >

                                            {question.map((qus) => (
                                                <MenuItem key={qus.id} value={qus.questionName}>
                                                    {qus.questionName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="answer"
                                        label="Answer"
                                        type="text"
                                        id="answer"
                                        value={state.answer}
                                        onChange={(event) => {
                                            setState({ ...state, answer: event.target.value })
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button

                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={onRegisterClick}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink to="/login" variant="body2">
                                        Already have an account? Sign in
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </ThemeProvider>
    );
}