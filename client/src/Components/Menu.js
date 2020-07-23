import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { useHistory, Link, useLocation } from "react-router-dom";
import UserContext from "../context/userContext";
import API from "../utils/API";

const MenuBar = () => {
  let urlLocation = useLocation();
  const User = useContext(UserContext);
  const history = useHistory();
  const [activeItem, setActiveItem] = useState(urlLocation.pathname.slice(1)); // setting initial state of whatever the ref is
  // an array to loop an create menu items
  const menuItems = [
    {
      name: "explore",
    },
    {
      name: "resources",
    },
    {
      name: "upload",
    },
    {
      name: "logout",
    },
    {
      name: "myaccount",
      alternate: "My Account",
    },
  ];

  const handleItemClick = (e, { name }) => setActiveItem(name);

  function logout() {
    API.logout();
    User.Login({});
    setTimeout(() => history.push("/"), 1500);
  }

  return (
    <div id="menuContainer">
      {/* <div>

</div> */}
      <Menu stackable inverted id="navMenu">
        <Menu.Item inverted>
          <i>MetaPhoto by GV</i>
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
              active={activeItem === "logout"}
              onClick={handleItemClick}
              position="right"
              as={Link}
              to="/logout"
              name="logout"
              onClick={() => logout()}
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
    </div>
  );
};

export default MenuBar;
