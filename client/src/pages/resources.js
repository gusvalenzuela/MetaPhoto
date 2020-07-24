import React, { useState, useEffect, useContext } from "react";
import Card from "../Components/PhotoCard";
import { Grid, Header, Container, Divider } from "semantic-ui-react";
import API from "../utils/API";
import Background from "../assets/images/HenryXuUnsplash.png";
import Background2 from "../assets/images/Charles.png";
import UserContext from "../context/userContext";

function Resources() {
  const [resources, setResources] = useState([]);
  const { setActivePage } = useContext(UserContext);
  setActivePage("explore"); // sets the classname for the menubar container

  useEffect(() => {
    getAllResources();
  }, []);

  function getAllResources() {
    API.getResources()
      .then((data) => setResources(data.data))
      .catch((err) => console.log(err));
  }

  return (
    <div id="mainContainer">
      <Header attached="top" id="heading" as="h1">
        Climbing Resources
      </Header>
      <Divider hidden />
      <Grid
        id="resourceGrid"
        stackable
        centered
        columns={4}
        verticalAlign="middle"
      >
        <Container
          as={Grid.Row}
          id={"para-row"}
          style={{ backgroundImage: `url(${Background})` }}
        >
          {resources.map((resource, index) => {
            return resource.level === 1 ? (
              <Grid.Column key={index}>
                <Card {...resource} />
              </Grid.Column>
            ) : null;
          })}
        </Container>
        <Container
          as={Grid.Row}
          id={"para-row"}
          style={{ backgroundImage: `url(${Background2})` }}
        >
          {resources.map((resource, index) => {
            return resource.level === 2 ? (
              <Grid.Column key={index}>
                <Card {...resource} />
              </Grid.Column>
            ) : null;
          })}
        </Container>
      </Grid>
    </div>
  );
}

export default Resources;
