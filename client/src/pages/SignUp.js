import React, {
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Divider,
  Container,
  Modal,
} from "semantic-ui-react";
import API from "../utils/API";

function SignUp() {
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    success: "",
    error: "",
  });

  function register() {
    let NewUser = {
      username: registerInfo.username,
      password: registerInfo.password,
      firstName: registerInfo.firstName || "First Name",
      lastName: registerInfo.lastName || "Last Name",
      email: registerInfo.email,
    };

    API.register(NewUser).then((res) => {
      res.data.name === "UserExistsError"
        ? setRegisterInfo({
            ...registerInfo,
            success: false,
            error: res.data.message,
          })
        : setRegisterInfo({ ...registerInfo, success: true });
    });
  }


  return (
    <Container className="mainContainer">
      <Header id="heading" as="h1">
        Register your new account
      </Header>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Divider horizontal hidden />
          <Header as="h2" textAlign="center">
            <Icon name="users" size="mini" /> Register for an account
          </Header>
          <Form size="large">
            <Segment>
              {/* <Form.Input
                fluid
                icon="address book"
                iconPosition="left"
                placeholder="First Name"
                onChange={(e) => setRegisterInfo({ ...registerInfo, firstName: e.target.value })}
              />
              <Form.Input
                fluid
                icon="address book"
                iconPosition="left"
                placeholder="Last Name"
                onChange={(e) => setRegisterInfo({ ...registerInfo, lastName: e.target.value })}
              /> */}
              <Form.Input
                required
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(e) =>
                  setRegisterInfo({ ...registerInfo, username: e.target.value })
                }
              />
              <Form.Input
                required
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) =>
                  setRegisterInfo({ ...registerInfo, password: e.target.value })
                }
              />
              <Form.Input
                required
                fluid
                icon="envelope open"
                iconPosition="left"
                placeholder="Email"
                type="Email"
                onChange={(e) =>
                  setRegisterInfo({ ...registerInfo, email: e.target.value })
                }
              />

              <button onClick={register}>Sign Up</button>
            </Segment>
          </Form>
          <Message attached="bottom" style={{ width: "99%", margin: "auto" }}>
            Already a Member?
            <Button basic as={Link} to="/login" name="login">
              Log In
            </Button>
          </Message>
        </Grid.Column>
      </Grid>
      {registerInfo.success === false ? (
        <Modal
          defaultOpen
          onClose={() => setRegisterInfo({ ...registerInfo, success: null })}
        >
          <Modal.Content>
            <Container textAlign="center">{registerInfo.error}</Container>
          </Modal.Content>
        </Modal>
      ) : null}
    </Container>
  );
}

export default SignUp;
