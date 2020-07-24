import React, { useContext } from "react";
// import {
//   Button,
//   Form,
//   Grid,
//   Header,
//   Segment,
//   Icon,
//   Container,
//   Message,
//   Modal,
//   // Image,
// } from "semantic-ui-react";
// import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";

function Landing() {
  const { setActivePage } = useContext(UserContext);
  setActivePage("home");
  return <div id="mainContainer"> HI THERE!</div>;
}

export default Landing;
