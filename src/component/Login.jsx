import React, { useState,useContext } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import allBackendService from '../service/allBackendService';
import { NavLink } from 'react-router-dom';

import { UserContext } from './UserContext';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login(props) {

  let userContext = useContext(UserContext);

  let [state, setState] = useState({
    email: "",
    password: "",
    roles: ""

  })
  let [roles] = useState([
    { id: 1, roleName: "Customer" },
    { id: 2, roleName: "Admin" },
  ]);

  let onLoginClick = (event) => {
    event.preventDefault();

    let data = {
      email: state.email,
      password: state.password,
      roles: state.roles
    }
    console.log(data);
    allBackendService.createLogin(data).then(response => {
      if(response){
        allBackendService.findUserDetail(state.email).then(res=>{
          userContext.dispatch({
            type: "login",
            payload: {
                currentUserEmail: res.data.email,
                currentUserFirstName: res.data.firstName,
                currentUserSubscribed:res.data.subscribed,

            },
        })
        })
      alert(response.data.message);
      props.history.push('/');
      }
      

    }, error => {
      console.log(error.response.data.message)
      alert(error.response.data.message)
    })
  }


  let [currentState, setCurrentState] = useState({
    email: "",
    mobile: "",
    forgetPassword: "",
    confirmPassword: ""
    
    

  })

  let saveChanges = (event) => {
    event.preventDefault();

    let forgetPasswordData = {
      email: currentState.email,
      mobile: currentState.mobile,
      password: currentState.forgetPassword,
      confirmPassword: currentState.confirmPassword
    }

    allBackendService.forgetPassword(forgetPasswordData).then(response => {

      setCurrentState({email:"",mobile:"",forgetPassword:"",confirmPassword:""})
      alert(response.data.message);

    }, error => {

    
      alert(error.response.data.message);

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
              Sign in
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
                
                value={state.email}
                onChange={(event) => {
                  setState({ ...state, email: event.target.value })
                }}
              />
              

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={(event) => {
                  setState({ ...state, password: event.target.value })
                }}
              />
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

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onLoginClick}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <button type="button" class="btn btn-link m-0" data-toggle="modal" data-target="#exampleModal">
                    Forgot password
                  </button>


                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Forget Password Page</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={currentState.email}
                            onChange={(event) => {
                              setCurrentState({ ...currentState, email: event.target.value });
                            }}

                          />
                          
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="mobile"
                            label="Mobile Number"
                            type="number"
                            id="mobile"
                            autoComplete="current-password"
                            value={currentState.mobile}
                            onChange={(event) => {
                              setCurrentState({ ...currentState, mobile: event.target.value });
                            }}

                          />
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={currentState.forgetPassword}
                            onChange={(event) => {
                              setCurrentState({ ...currentState, forgetPassword: event.target.value });
                            }}

                          />
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            autoComplete="current-password"
                            value={currentState.confirmPassword}
                            onChange={(event) => {
                              setCurrentState({ ...currentState, confirmPassword: event.target.value });
                            }}

                          />


                        </div>
                        <div class="modal-footer">
                          
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" onClick={saveChanges}>Save changes</button>

                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  <NavLink to="/signup" variant="body2" className="mr-5">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                  <NavLink to="/loginusinggmail" variant="body2">
                    {"Login using Gmail"}
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