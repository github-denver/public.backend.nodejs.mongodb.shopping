const express = require("express");
const router = express.Router();

const {
  colors,
  create,
  read,
  update,
  destroy,
} = require("../controllers/color.controller");
const { auth, admin } = require("../middlewares/auth.middleware");

router.get("/", colors);
router.post("/", auth, admin, create);
router.get("/:id", read);
router.put("/update/:id", auth, admin, update);
router.delete("/:id", auth, admin, destroy);

module.exports = router;
