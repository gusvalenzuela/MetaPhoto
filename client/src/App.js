import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyAccount from "./pages/account";
import Upload from "./pages/upload";
import Home from "./pages/home";
import Explore from "./pages/explore";
import Resources from "./pages/resources";
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import Settings from "./pages/settings";
import LogOut from "./pages/logout";
import NotFound from "./pages/404";
import MenuBar from "./Components/Menu";
import SidebarMenu from "./Components/SidebarMenu";
import UserContext from "../src/context/userContext";
import "./index.css";
import "./App.css";
require(`dotenv`).config();

export default function App() {
  const [user, setUser] = useState({});
  const [activePage, setActivePage] = useState("");

  const Login = (User) => {
    setUser(User);
  };

  return (
    <UserContext.Provider value={{ user, Login, setActivePage }}>
      <Router>
        {/* <SidebarMenu MenuBar={MenuBar}> */}
        {/* menu  */}
        {/* switcheroos  */}
        <MenuBar page={activePage} />
        <Switch>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route exact path={["/explore", "/explores"]}>
            <Explore sidebarMenu={SidebarMenu} />
          </Route>
          <Route exact path="/myaccount">
            {!user.username ? <Redirect to="/" /> : <MyAccount />}
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/upload">
            <Upload />
            {/* {!user.username? <Redirect to="/login" /> : <Upload />} */}
          </Route>
          <Route exact path="/login">
            {!user.username ? <LogIn /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            {!user.username ? <SignUp /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/logout">
            {!user.username ? <LogOut /> : <Redirect to="/login" />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        {/* </SidebarMenu> */}
      </Router>
    </UserContext.Provider>
  );
}
