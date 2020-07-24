const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const logger = require(`morgan`);
const compression = require(`compression`);
const flash = require("connect-flash");
const db = require("./models");
const routes = require("./routes");
const app = express();
const MemoryStore = require('memorystore')(session)

const PORT = process.env.PORT || 3001; // react running @ 3000

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define middleware here
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("secretcode"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000, secure: true },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig.js")(passport, db);
app.use(logger("dev"));
app.use(compression());

app.use(routes); // react will handle "/*" requests, this defines "/*/*" requests
// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactMetaPhotodb",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
