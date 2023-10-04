import { ConstructionOutlined } from '@mui/icons-material';
import React, { useContext} from 'react';
import { NavLink } from "react-router-dom";
import allBackendService from '../service/allBackendService';
import { UserContext } from './UserContext';

export default function Navbar(props) {
    let userContext = useContext(UserContext);
    let onLogoutClick = (event) => {
        event.preventDefault();
        userContext.dispatch({
            type: "logout",
        })
        
        window.location= "/";
    }
    let deactivateAccount = (event)=>{
        event.preventDefault();
        let text = window.confirm("Are you sure you want to deactivate your account !!!...");
        if(text == true){
            allBackendService.accountDeactivate(userContext.user.currentUserEmail).then(res=>{
                userContext.dispatch({
                    type: "logout",
                })
                alert(res.data.message);
                window.location= "/";
                
            },error=>{
                alert(error.response.data.message);
            })
        }
        
        
    }
    let subscribe = (event)=>{
        event.preventDefault();
        allBackendService.subscribe(userContext.user.currentUserEmail).then(response=>{
            userContext.dispatch({
                type: "login",
                payload: {
                    
                    currentUserSubscribed:true,
                    currentUserFirstName:userContext.user.currentUserFirstName,
                    currentUserEmail:userContext.user.currentUserEmail,
    
                },
            })
            alert(response.data.message);
        })
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" to="#">Hkart</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>


                    </ul>
                    <ul className="navbar-nav">
                        {!userContext.user.isLoggedln ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>) : ("")}
                        {!userContext.user.isLoggedln ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup">Register</NavLink>
                            </li>) : ("")}

                        {userContext.user.isLoggedln ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to=''>{userContext.user.currentUserFirstName}</NavLink>
                            </li>) : ("")}

                            {userContext.user.isLoggedln ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to='' onClick={deactivateAccount}>Account Deactivate</NavLink>
                            </li>) : ("")}

                            {userContext.user.isLoggedln && userContext.user.currentUserSubscribed==false? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to='' onClick={subscribe}>Subscribe</NavLink>
                            </li>) : ("")}

                            

                            

                        {userContext.user.isLoggedln ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to='' onClick={onLogoutClick}>Logout</NavLink>
                            </li>) : ("")}


                    </ul>


                </div>
            </nav >
        </>
    )

}

