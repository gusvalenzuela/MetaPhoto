import axios from "axios";

export default {
  // Gets all routes by lat,lon
  getRoutesbyLatLon: function (GPS) {
    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${GPS.coords.latitude}&lon=${GPS.coords.longitude}&maxDistance=30&key=200765490-6a4f3ccdce84ab9b6225f209a2b16baf`;
    return axios.get(queryURI);
  },
  getResources: function () {
    return axios.get("/api/resources");
  },

  postPhoto: function (data) {
    let Photo = {
      photoID: data.handle,
      url: data.url,
      userID: 1,
      routeID: 1,
    };
    return axios.post("/api/photo", Photo);
  },

  postLike: function (data) {
    let Like = {
      likeID: data.likeID,
      type: data.type,
      userID: data.userID,
    };
    return axios.post("/api/photo" + data.photoID, Like);
  },

  signUpUser: function (data) {
    return axios.post("/api/user", data);
  },
};
