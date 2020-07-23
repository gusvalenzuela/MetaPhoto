const router = require("express").Router();
const climbsController = require("../../controllers/climbsController");

// Matches with "/api/climbs"
router.route("/").get(climbsController.findAll).post(climbsController.create);

// Matches with "/api/climbs/:id"
router
  .route("/:id")
  .post(climbsController.update)
  .get(climbsController.findById)
  .put(climbsController.update)
  .delete(climbsController.remove);

module.exports = router;
