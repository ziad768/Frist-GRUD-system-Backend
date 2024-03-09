const express = require("express");
const router = express.Router();
const validtionUser = require("../middlewares/validtionSchema");
const UserController = require("../controllers/Users.controller");

router
  .route("/")

  .get(UserController.GetAllUsers)
  .post(validtionUser.CreateUserValid(), UserController.CreateUser);

router
  .route("/:userId")
  .get(UserController.GetSingleUser)
  .patch(UserController.UpdateUser)
  .delete(UserController.DeleteUser);

module.exports = router;
