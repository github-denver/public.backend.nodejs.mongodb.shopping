const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  loginUser,
  getUserById,
  destroyUser,
} = require("../controllers/user.controller");
const { auth, admin } = require("../middlewares/auth.middleware");

router.post("/register", createUser);
router.get("/users", getUsers);
router.post("/login", loginUser);
router.get("/:id", auth, admin, getUserById);
router.delete("/:id", auth, admin, destroyUser);

module.exports = router;
