import React, { useContext, useState } from "react";
import { Card, Icon, Menu, Label, List } from "semantic-ui-react";
import UserContext from "../../context/userContext";
import API from "../../utils/API";

const RouteCard = (props) => {
  const userData = useContext(UserContext);
  const [newUpdate, setNewUpdate] = useState({});

  function handleVoting(evt, type) {
    if (type === "up") {
      API.postLike(userData.user._id, {
        typeOf: "like",
        userID: userData.id,
      }).then(() => {
        setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
      });
    } else {
      API.postLike(userData.user._id, {
        typeOf: "dislike",
        userID: userData.id,
      });
      setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
    }
  }

  return (
    <Card>
      <Card.Content
        style={{
          height: "200px",
          backgroundImage: `url(${
            props.imgSmallMed ? props.imgSmallMed : props.photo
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <Label
          corner="left"
          as="a"
          icon={{ name: "heart" }}
          // onClick={() => console.log("cricket")}
        />
      </Card.Content>
      <Card.Content>
        <Card.Header>{props.name} </Card.Header>
        <Card.Description>
          {props.desc ? (
            <div>{props.desc}</div>
          ) : (
            <div>
              Diff: {props.rating}
              <br /> Popularity: {props.stars}
              <Icon color="yellow" name="star outline" />
              <br />
              {props.type ? "Type: " + props.type : null}
              {props.proximity ? (
                <List.Item>~{props.proximity.toFixed(2)} mi. away</List.Item>
              ) : null}
            </div>
          )}
          {props.location ? (
            <List>
              <List.Item>
                {props.location[1] + ", " + props.location[0]}
              </List.Item>
            </List>
          ) : null}
        </Card.Description>
      </Card.Content>
      {userData.user.username ? (
        <Menu widths="3" fluid compact>
          <Menu.Item
            id={props.id}
            onClick={(e) => handleVoting(e, "up")}
            position="left"
            icon="thumbs up"
            content="Like"
          />
          <Menu.Item as="a" href={props.url} target="_blank">
            Info
          </Menu.Item>
          <Menu.Item
            id={props.id}
            onClick={(e) => handleVoting(e, "down")}
            position="right"
            icon="thumbs down"
            content="Dislike"
          />
        </Menu>
      ) : (
        <Menu fluid widths="1">
          <Menu.Item as="a" href={props.url} target="_blank">
            Info
          </Menu.Item>
        </Menu>
      )}
    </Card>
  );
};

export default RouteCard;
