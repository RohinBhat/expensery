const express = require("express");
const {
  createUserController,
  loginUserController,
  logoutUserController,
  logoutAllUsersController,
  getUserProfileController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");

const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/", createUserController);
router.post("/login", loginUserController);
router.post("/logout", auth, logoutUserController);
router.post("/logoutAll", auth, logoutAllUsersController);
router.get("/me", auth, getUserProfileController);
router.patch("/me", auth, updateUserController);
router.delete("/me", auth, deleteUserController);

module.exports = router;
