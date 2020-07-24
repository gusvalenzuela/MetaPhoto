import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Container,
  Message,
  Modal,
  // Image,
} from "semantic-ui-react";
import API from "../utils/API";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/userContext";

function LogIn() {
  const user = useContext(UserContext);
  let history = useHistory();

  const [loginData, setLoginData] = useState({});

  function login(evt) {
    if (loginData.username && loginData.password) {
      API.login(loginData.username, loginData.password).then((res) => {
        res.data === "No User Exists"
          ? setLoginData({ ...loginData, success: false })
          : (res.data.password = "hunter2" && user.Login(res.data));
        if (res.username) {
          history.replace("/explore");
        }
      });
    }
  }

  return (
    <Container id="mainContainer">
      <Header attached="top" as="h1" id="heading">
        MetaPhoto v.GRV
      </Header>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            <Icon name="users" size="mini" /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment>
              <Form.Input
                required
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
              />
              <Form.Input
                type="password"
                required
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <Button content="Login" onClick={login} />
            </Segment>
          </Form>
          <Message attached="bottom" style={{ width: "99%", margin: "auto" }}>
            New to us?
            <Button basic as={Link} to="/signup" content="Sign Up" />
          </Message>
        </Grid.Column>
      </Grid>
      {loginData.success === false ? (
        <Modal
          defaultOpen
          onClose={(e) => {
            setLoginData({});
            history.replace("/login");
          }}
        >
          <Modal.Content>
            <Container textAlign="center">
              Sorry, no user found with that password.
            </Container>
          </Modal.Content>
        </Modal>
      ) : null}
    </Container>
  );
}

export default LogIn;
