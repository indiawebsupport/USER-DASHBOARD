import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import allBackendService from '../service/allBackendService';
import { UserContext } from './UserContext';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function MatchOtp(props) {

    let userContext = useContext(UserContext);
    // console.log(userContext.user.currentUserEmail);

    let [state, setState] = useState({

        roles: "",
        otp: ""

    })

    let [roles] = useState([
        { id: 1, roleName: "Customer" },
        { id: 2, roleName: "Admin" },
    ]);



    let generateOtp = (event) => {
        event.preventDefault();

        let data = {
            email: userContext.user.currentUserEmail,
            roles: state.roles,
            otp: state.otp

        }

        allBackendService.loginUsingOtp(data).then(response => {

            state.msg = response.data.message;
            console.log(state.msg)
            if (response) {
                allBackendService.findUserDetail(userContext.user.currentUserEmail).then(res => {
                    userContext.dispatch({
                        type: "login",
                        payload: {
                            currentUserEmail: res.data.email,
                            currentUserFirstName: res.data.firstName,

                        },
                    })
                })


            }
            alert(response.data.message);
            props.history.push('/');

        }, error => {


            alert(error.response.data.message);
            state.msg = error.response.data.message;
            console.log(error.response.data.message);
            console.log(state.msg);





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
                            my: 8,
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
                            Login Using Gmail
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
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

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="OTP"
                                name="otp"
                                autoComplete="number"

                                type="number"
                                value={state.otp}
                                onChange={(event) => {
                                    setState({ ...state, otp: event.target.value });
                                }}
                            />


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={generateOtp}

                            >
                                Login
                            </Button>


                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}