const express = require("express");
const router = express.Router();

const userValidator = require("../models/validator/userValidator");
const userController = require("../controllers/userController");

// router
//     .route("/top-users")
//     .get(userController.aliasTopUsers, userController.getAllUser);

router.route("/")
    .get(userController.getAllUser)
    .post(userValidator.createUser, userController.createUser);

// get user by id - (params: [userId]) - (userId is required)
router.route("/:id")
    .get(userValidator.getUserById, userController.getUserById)
    .put(userValidator.updateUser, userController.updateUser)
    .delete(userValidator.deleteUserById, userController.deactivateUserById);

module.exports = router;
