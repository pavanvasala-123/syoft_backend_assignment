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
  adminOrManager,
  noStaff,
} = require("../Auth Middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, noStaff, admin, createProduct);
router.get("/", auth, noStaff, adminOrManager, getProducts);
router.put("/:id", auth, noStaff, adminOrManager, updateProduct);
router.delete("/:id", auth, noStaff, admin, deleteProduct);

module.exports = router;
