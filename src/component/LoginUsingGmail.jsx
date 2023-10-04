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
import allBackendService from '../service/allBackendService';
import { UserContext } from './UserContext';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginUsingGmail(props) {

    let userContext = useContext(UserContext);

    let [state, setState] = useState({
        email: "",
    })


    let generateOtp = (event) => {
        event.preventDefault();

        let data = {
            email: state.email,

        }

        allBackendService.generateOtp(data).then(response => {

            if (response) {
                userContext.dispatch({
                    type: "email",
                    payload: {
                        currentUserEmail: state.email

                    },
                })

                setState({ email: "" });
                state.msg = response.data.message;
                props.history.replace("/matchotp")
                console.log(state.msg)

                alert(response.data.message);

            }




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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                value={state.email}
                                onChange={(event) => {
                                    setState({ ...state, email: event.target.value });
                                }}
                            />

                            
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={generateOtp}

                            >
                                Generate OTP
                            </Button>


                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}