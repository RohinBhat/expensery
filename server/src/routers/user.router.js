const express = require("express");
const {
  createUserController,
  loginUserController,
  logoutUserController,
  getUserProfileController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");

const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/", createUserController);
router.post("/login", loginUserController);
router.post("/logout", auth, logoutUserController);
router.get("/me", auth, getUserProfileController);
router.patch("/me", auth, updateUserController);
router.delete("/me", auth, deleteUserController);

module.exports = router;
