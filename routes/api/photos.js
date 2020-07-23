const router = require("express").Router();
const photosController = require("../../controllers/photosController");

// Matches with "/api/photos"
router.route("/").get(photosController.findAll).post(photosController.create);

// Matches with "/api/photos/handle:handle"
router
  .route("/handle:handle")
  .get(photosController.findByHandle)
  .put(photosController.updateWithHandle);

// Matches with "/api/photos/:id"
router
  .route("/:id")
  .post(photosController.like)
  .get(photosController.findById)
  .put(photosController.update)
  .delete(photosController.remove);
// Matches with "/api/photos/user=:id"
router
  .route("/user=:id")
  .post(photosController.like)
  .get(photosController.findUserAll)
  .put(photosController.update)
  .delete(photosController.remove);

module.exports = router;
