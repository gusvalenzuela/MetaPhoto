const router = require("express").Router();
const photosRoutes = require("./photos");
const resourcesRoutes = require("./resources");
const climbsRoutes = require("./climbs");
const usersRoutes = require("./users");
const usersController = require("../../controllers/usersController");

// API routes [match '/api/[location]` (ex. /api/photos)]
router.use("/photos", photosRoutes);
router.use("/resources", resourcesRoutes);
router.use("/climbs", climbsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
