const router = require("express").Router();
const resourcesController = require("../../controllers/resourcesController");

// Matches with "/api/photo"
router
  .route("/")
  .get(resourcesController.findAll)
  .post(resourcesController.create);
router
  .route("/:id")
  .put(resourcesController.update)
  .delete(resourcesController.remove);

module.exports = router;
