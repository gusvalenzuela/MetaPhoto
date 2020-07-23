const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router
  .route("/")
  .get(usersController.findAll)
  .post(usersController.createUser);

router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.updateUser)
  .delete(usersController.removeUser);

module.exports = router;
