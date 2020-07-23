const router = require("express").Router();
const passport = require("passport");
const User = require("../../models/user");
const usersController = require("../../controllers/usersController");

// AUTH routes [match '/auth/[location]` (ex. /auth/login)]
router.route("/login").post(usersController.authenticate);

router.route("/logout").get(usersController.logout);

router.route("/signup").post(usersController.createUser);

module.exports = router;
