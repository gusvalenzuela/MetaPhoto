import axios from "axios";

export default {
  // Gets all routes by lat,lon
  getRoutesByNavigator: function (GPS, range) {
    let lat = GPS.coords.latitude.toFixed(4);
    let lon = GPS.coords.longitude.toFixed(4);
    let apiKey = process.env.REACT_APP_MOUNTAIN_API_KEY;

    const queryURI = `https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${lat}&lon=${lon}&maxDistance=${range}&key=${apiKey}`;
    console.log(queryURI);
    return axios.get(queryURI);
  },
  getRoutesbySearch: function (searchTerm = "Lake Tahoe") {
    const geoCodeKey = "jmu2hzM4mHMBWSGPseb1cGFiAZ4CSPKI";
    const url =
      "https://www.mapquestapi.com/geocoding/v1/address?key=" +
      geoCodeKey +
      "&location=" +
      searchTerm.toLowerCase();
    return axios.get(url);
  },
  getResources: function () {
    return axios.get("/api/resources");
  },
  getPhoto: function () {
    return axios.get("/api/photos");
  },
  getUsersPhotos: function (id) {
    return axios.get("/api/photos/user=" + id);
  },
  getPhotoByHandle: function (handle) {
    return axios.get("/api/photohandle" + handle);
  },
  postSinglePhoto: function (photo) {
    return axios.post("/api/photo", photo).then((res) => {});
  },
  postPhoto: function (data) {
    let userID = data.userID;
    data.filesUploaded.forEach((photo) => {
      console.log(photo);
      if (photo.status === "Stored") {
        let Photo = {
          handle: photo.handle,
          url: "https://cdn.filestackcontent.com/" + photo.handle,
          userID: userID,
          routeID: 1,
        };
        console.log(Photo);
        return axios.post("/api/photo", Photo).then((res) => {
          // console.log(res);
        });
      } else {
        alert(`Photo: ${photo.filename} failed to upload`);
      }
    });
  },
  updatePhoto: function (id, photo) {
    return axios.put("/api/photo" + id, photo);
  },
  updatePhotoByHandle: function (handle, photo) {
    return axios.put("/api/photohandle" + handle, photo);
  },

  postLike: function (id, data) {
    let Like = {
      typeOf: data.typeOf,
      userID: data.userID,
    };
    return axios.post("/api/photos/" + id, Like);
  },
  postFavorite: function (id, data) {
    let Fav = {
      typeOf: data.typeOf,
      userID: data.userID,
    };
    return axios.post("/api/favorite" + id, Fav);
  },

  signUpUser: function (data) {
    return axios.post("/api/user", data);
  },
  deleteUserAccount: function (id) {
    return axios.delete("/api/user" + id);
  },

  register: function (NewUser) {
    return axios.post(`/auth/signup`, NewUser);
  },

  login: function (user, pass) {
    return axios.post(
      `/auth/login`,
      {
        username: user,
        password: pass,
      },
      {
        withCredentials: true,
      }
    );
  },
  logout: function () {
    axios.get("/logout");
  },

  getUser: function (setData) {
    axios.get(`/user`).then((res) => {
      setData(res.data);
      // console.log(res);
    });
  },

  getUserById: function (userID) {
    return axios.get(`/api/user${userID}`);
  },

  getPhotoInformation: function () {
    return axios.get(`/api/photos`);
  },

  updateUserProfilePic: function (id, data) {
    return axios.put(`/api/user${id}`, data);
  },
};

// container: undefined
// filename: "2020-04-14 04.16.45.jpg"
// handle: "ObcSrDE4Qc6XuKVEI19x"
// key: undefined
// mimetype: (...)
// name: (...)
// size: (...)
// status: "Stored"
// type: (...)
// uploadTags: undefined
// url: "https://cdn.filestackcontent.com/ObcSrDE4Qc6XuKVEI19x"
// workflows: undefined
