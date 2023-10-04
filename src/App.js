import React, { useReducer } from "react";
import Navbar from './component/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext } from './component/UserContext';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import SignUp from './component/Signup';
import Login from './component/Login';
import LoginUsingGmail from './component/LoginUsingGmail';
import MatchOtp from './component/MatchOtp';

let initalUser = {
  isLoggedln: false,
  currentUserFirstName: null,
  currentUserEmail: null,
  currentUserRole: null,
  currentUserSubscribed:false,
}

//reducer: operation on "user" state
let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedln: true,
        currentUserFirstName: action.payload.currentUserFirstName,
        currentUserEmail: action.payload.currentUserEmail,
        currentUserRole: action.payload.currentUserRole,
        currentUserSubscribed: action.payload.currentUserSubscribed,
      };
    case "logout":
      return {
        isLoggedln: false,
        currentUserFirstName: null,
        currentUserEmail: null,
        currentUserRole: null,
      };
    case "email":
      return {
        isLoggedln: false,
        currentUserEmail: action.payload.currentUserEmail,

      };


    default:
      return state;
  }
}





function App() {
  let [user, dispatch] = useReducer(reducer, initalUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact={true} component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/contact" component={Contact}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/loginusinggmail" component={LoginUsingGmail}></Route>
            <Route path="/matchotp" component={MatchOtp}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserContext.Provider>

  );
}
export default App;
