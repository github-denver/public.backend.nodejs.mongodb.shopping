const express = require("express");
const router = express.Router();

const {
  create,
  products,
  read,
  update,
  destroy,
} = require("../controllers/product.controller");
const { auth, admin } = require("../middlewares/auth.middleware");

router.get("/", products);
router.post("/", auth, admin, create);
router.get("/:id", read);
router.put("/update/:id", auth, admin, update);
router.delete("/:id", auth, admin, destroy);

module.exports = router;
