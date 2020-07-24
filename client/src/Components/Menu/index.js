import React, { useContext, useState } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { useHistory, Link, useLocation } from "react-router-dom";
import UserContext from "../../context/userContext";
import API from "../../utils/API";
import "./style.css";

const MenuBar = ({ page }) => {
  let urlLocation = useLocation();
  const User = useContext(UserContext);
  const history = useHistory();
  const [activeItem, setActiveItem] = useState(urlLocation.pathname.slice(1)); // setting initial state of whatever the ref is
  // an array to loop an create menu items
  // const menuItems = [
  //   {
  //     name: "explore",
  //   },
  //   {
  //     name: "resources",
  //   },
  //   {
  //     name: "upload",
  //   },
  //   {
  //     name: "logout",
  //   },
  //   {
  //     name: "myaccount",
  //     alternate: "My Account",
  //   },
  // ];

  const handleItemClick = (e, { name }) => setActiveItem(name);

  function logout() {
    API.logout();
    User.Login({});
    setTimeout(() => history.push("/"), 1500);
  }

  return (
    <div className={page} id="menu-container">
      <Menu stackable inverted id="navMenu">
        <Menu.Item name="home" className={`menubar-item`} as={Link} to="/">
          <img
            alt="MetaPhoto Icon"
            src="/images/rock-climb-unsplash-icon-150x150.jpg"
          />
          <i style={{ marginLeft: ".5rem", color: "#0a7" }}>MetaPhoto by GV</i>
        </Menu.Item>
        <Menu.Item
          className={`menubar-item`}
          active={activeItem === "explore"}
          onClick={handleItemClick}
          as={Link}
          to="/explore"
          name="explore"
        />
        <Menu.Item
          className={`menubar-item`}
          active={activeItem === "resources"}
          onClick={handleItemClick}
          as={Link}
          to="/resources"
          name="resources"
        />
        <Menu.Item
          className={`menubar-item`}
          active={activeItem === "upload"}
          onClick={handleItemClick}
          as={Link}
          to="/upload"
          name="upload"
        />

        {User.user.username ? (
          <>
            <Menu.Item
              className={`menubar-item`}
              onClick={logout}
              position="right"
              as={Link}
              to="/logout"
              name="logout"
            />
            <Menu.Item
              as={Link}
              className={`menubar-item`}
              active={activeItem === "my account"}
              onClick={handleItemClick}
              to="/myaccount"
              name="my account"
            />
          </>
        ) : (
          <>
            <Menu.Item
              className={`menubar-item`}
              active={activeItem === "login"}
              onClick={handleItemClick}
              position="right"
              as={Link}
              to="/login"
              name="login"
            />
            <Menu.Item
              className={`menubar-item`}
              active={activeItem === "signup"}
              onClick={handleItemClick}
              as={Link}
              to="/signup"
              name="signup"
            />
          </>
        )}
      </Menu>
      {page === "home" ? (
        <Container text className="home-nav-header">
          <h1>MetaPHOTO by GV</h1>
          <h3>Share your rock climbing adventures!</h3>
          <Button
            as={Link}
            to="/explore"
            size="huge"
            color="vk"
            content="Explore"
          />
          <Button
            as={Link}
            to="/upload"
            size="huge"
            color="vk"
            content="Start Uploading"
          />
        </Container>
      ) : (
        <Container text className="other-nav-header">
          <h3>Share your rock climbing adventures!</h3>
        </Container>
      )}
    </div>
  );
};

export default MenuBar;
