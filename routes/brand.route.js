const express = require("express");
const router = express.Router();

const {
  brands,
  create,
  read,
  update,
  destroy,
} = require("../controllers/brand.controller");
const { auth, admin } = require("../middlewares/auth.middleware");

router.get("/", brands);
router.post("/", auth, admin, create);
router.get("/:id", read);
router.put("/update/:id", auth, admin, update);
router.delete("/:id", auth, admin, destroy);

module.exports = router;
