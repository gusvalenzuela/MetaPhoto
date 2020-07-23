import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Tab,
  Input,
  Form,
  Icon,
  Dropdown,
  Button,
} from "semantic-ui-react";
import Card from "../Components/card";
import API from "../utils/API";
import UserContext from "../context/userContext";
import UserImageCard from "../Components/userImageCard";
import UTILS from "../utils/utils.js";

import cachedRoutes from "../utils/cacheRoutes.json";

function Explore() {
  const user = useContext(UserContext);
  const [UserPhotos, setUserPhotos] = useState([]);
  const [localClimbs, setLocalClimbs] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    current: "Lake Tahoe, CA",
    past: "",
  });
  const [range, setRange] = useState(30);
  const [sortKey, setSortKey] = useState("name");
  const sortResultsOptions = [
    {
      key: "name",
      value: "name",
      text: "Name",
    },
    {
      key: "stars",
      value: "stars",
      text: "Popularity",
    },
    {
      key: "rating",
      value: "rating",
      text: "Difficulty",
    },
    {
      key: "proximity",
      value: "proximity",
      text: "Proximity",
    },
  ];

  const {
    items: sortedClimbs,
    requestSort,
    sortConfig,
  } = UTILS.useSortableData(localClimbs);

  useEffect(() => {
    // FOR DEVELOPMENT
    let { routes } = cachedRoutes;
    let Routes = [];
    routes.forEach((route) => {
      if (route.imgMedium !== "") {
        Routes.push(route);
      }
    });
    var updatedRoutes = Routes.map((route) => {
      // adding a "proximity" factor to use in sorting
      let proximity = UTILS.calculateDistance(
        39.55,
        -123.4384,
        route.latitude,
        route.longitude,
        "K"
      );
      return { ...route, proximity: proximity };
    });
    setSearchTerm({ ...searchTerm, past: searchTerm.current });
    setLocalClimbs(updatedRoutes);

    // get location from browser to get climbs
    // on mount
    // navigator.geolocation.getCurrentPosition((resp) => {
    //   // console.log(resp);
    //   API.getRoutesByNavigator(resp, range).then((data) => {
    //     let { routes } = data.data;
    //     let Routes = [];
    //     routes.forEach((route) => {
    //       if (route.imgMedium !== "") {
    //         Routes.push(route);
    //       }
    //     });
    //     var updatedRoutes = Routes.map((route) => {
    //       // adding a "proximity" factor to use in sorting
    //       let proximity = UTILS.calculateDistance(
    //         resp.coords.latitude,
    //         resp.coords.longitude,
    //         route.latitude,
    //         route.longitude,
    //         "K"
    //       );
    //       return { ...route, proximity: proximity };
    //     });
    //     setSearchTerm({ ...searchTerm, past: searchTerm.current });
    //     setLocalClimbs(updatedRoutes);
    //   });
    // });

    API.getPhoto().then((data) => {
      setUserPhotos(data.data);
    });
  }, []);

  function cardBuilder(array, type) {
    return array.map((data, index) => {
      return (
        <Grid.Column key={index}>
          {type !== "userImageCard" ? (
            <Card {...data} />
          ) : (
            <UserImageCard {...data} />
          )}
        </Grid.Column>
      );
    });
  }

  const getLocalClimbs = () => {
    if (searchTerm.current !== "") {
      API.getRoutesbySearch(searchTerm.current).then((res) => {
        let coordsObj = {
          coords: {
            latitude: res.data.results[0].locations[0].latLng.lat,
            longitude: res.data.results[0].locations[0].latLng.lng,
          },
        };
        // console.log(searchTerm, range)
        API.getRoutesByNavigator(coordsObj, range).then((data) => {
          let { routes } = data.data;
          let Routes = [];
          routes.forEach((route) => {
            if (route.imgMedium !== "") {
              Routes.push(route);
            }
          });
          var updatedRoutes = Routes.map((route) => {
            // adding a "proximity" factor to use in sorting
            let proximity = UTILS.calculateDistance(
              coordsObj.coords.latitude,
              coordsObj.coords.longitude,
              route.latitude,
              route.longitude,
              "K"
            );
            return { ...route, proximity: proximity };
          });
          setSearchTerm({ ...setSearchTerm, past: searchTerm.current });
          setLocalClimbs(updatedRoutes);
        });
      });
    }
  };

  const panes = [
    {
      menuItem: {
        key: "0",
        content: "Local Climbs",
        style: { backgroundColor: "#ffffff" },
      },
      render: () => (
        <Tab.Pane
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr 650px",
            overflow: "auto",
          }}
        >
          <Form stackable style={{ backgroundColor: "#fff", padding: "1rem" }}>
            <Form.Group
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Form.Field>
                <span>
                  <Input
                    required
                    label="Climbs Near: "
                    icon={
                      <Icon
                        inverted
                        name="search"
                        circular
                        link
                        onClick={() => {
                          getLocalClimbs();
                        }}
                      />
                    }
                    onChange={(e) => {
                      setSearchTerm({
                        ...searchTerm,
                        current: e.currentTarget.value,
                      });
                    }}
                    placeholder={searchTerm.past}
                  />
                </span>
              </Form.Field>
              <Form.Dropdown
                inline
                // header="Search Radius"
                compact
                selection
                onChange={(e, { value }) => {
                  setRange(value);
                }}
                defaultValue={30}
                options={[
                  {
                    selected: true,
                    key: "15",
                    text: "15 Miles",
                    value: 15,
                  },
                  {
                    key: "30",
                    text: "30 Miles",
                    value: 30,
                  },
                  {
                    key: "50",
                    text: "50 Miles",
                    value: 50,
                  },
                  {
                    key: "100",
                    text: "100 Miles",
                    value: 100,
                  },
                  {
                    key: "150",
                    text: "150 Miles",
                    value: 150,
                  },
                  {
                    key: "200",
                    text: "200 Miles",
                    value: 200,
                  },
                ]}
              />
            </Form.Group>
          </Form>
          <div className="sort-search-container">
            <span>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: `${
                    sortConfig.direction === "ascending" ? "#000" : "#aaa"
                  }`,
                }}
                className="sort-button"
                onClick={() => {
                  requestSort(sortKey);
                }}
                icon={
                  sortConfig.direction === "ascending"
                    ? "sort amount up"
                    : "sort amount down"
                }
                text="Sort"
              />
              Sort results by{" "}
              <Dropdown
                inline
                options={sortResultsOptions}
                defaultValue={sortResultsOptions[0].value}
                onChange={(e, { value }) => {
                  // at each selection
                  setSortKey(value);
                  requestSort(value);
                }}
              />
            </span>
          </div>
          <div id="cardGrid">
            {sortedClimbs ? (
              cardBuilder(sortedClimbs, "card")
            ) : (
              <h2>Please begin a new search above</h2>
            )}
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "1",
        content: "User Photos",
        style: { backgroundColor: "#ffffff" },
      },
      render: () => (
        <Tab.Pane
          style={{
            display: "grid",
            gridTemplateRows: "768px",
            overflow: "auto",
          }}
        >
          <div id="cardGrid">{cardBuilder(UserPhotos, "userImageCard")}</div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div id="mainContainer">
      <Tab panes={panes} /> 
      {/* <Tab panes={user.user.username ? panes : [panes[0]]} /> */}
    </div>
  );
}

export default Explore;
