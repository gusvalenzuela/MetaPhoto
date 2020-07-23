import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyAccount from "./pages/MyAccount";
import Upload from "./pages/upload";
import Explore from "./pages/explore";
import Resources from "./pages/resources";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Settings from "./pages/Settings.js";
import LogOut from "./pages/Logout";
import NotFound from "./pages/404";
import MenuBar from "./Components/Menu";
import UserContext from "../src/context/userContext";
import "./index.css";
import "./App.css";
require(`dotenv`).config();

export default function App() {
  const [user, setUser] = useState({});

  const Login = (User) => {
    setUser(User);
  };

  return (
    <UserContext.Provider value={{ user, Login }}>
      <Router>
        <Switch>
          <Route exact path={["/explore", "/"]}>
            <MenuBar />
            <Explore />
          </Route>
          <Route exact path="/myaccount">
            <MenuBar />
            {!user.username ? <Redirect to="/" /> : <MyAccount />}
          </Route>
          <Route exact path="/resources">
            <MenuBar />
            <Resources />
          </Route>
          <Route exact path="/upload">
            <MenuBar />
            <Upload />
            {/* {!user.username? <Redirect to="/login" /> : <Upload />} */}
          </Route>
          <Route exact path="/login">
            <MenuBar />
            {!user.username ? <LogIn /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            <MenuBar />
            {!user.username ? <SignUp /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/settings">
            <MenuBar />
            <Settings />
          </Route>
          <Route exact path="/logout">
            <MenuBar />
            {!user.username ? <LogOut /> : <Redirect to="/login" />}
          </Route>
          <Route>
            <MenuBar />
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
