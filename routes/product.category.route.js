const express = require("express");
const router = express.Router();

const {
  categories,
  create,
  read,
  update,
  destroy,
} = require("../controllers/product.category.controller");
const { auth, admin } = require("../middlewares/auth.middleware");

router.get("/", categories);
router.post("/", auth, admin, create);
router.get("/:id", read);
router.put("/update/:id", auth, admin, update);
router.delete("/:id", auth, admin, destroy);

module.exports = router;
