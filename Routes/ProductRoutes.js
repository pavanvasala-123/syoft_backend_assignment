const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controllers/ProductController");
const {
  auth,
  admin,
  manager,
  noStaff,
} = require("../Auth Middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, noStaff, admin, createProduct);
router.get("/", auth, noStaff, admin, manager, getProducts);
router.put("/:id", auth, noStaff, admin, manager, updateProduct);
router.delete("/:id", auth, noStaff, admin, deleteProduct);

module.exports = router;
