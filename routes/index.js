const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");
const usersController = require("../controllers/usersController");
// API routes
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

router.route("/user").get(usersController.getUser);
router.route("/logout").get(usersController.logout);

module.exports = router;
