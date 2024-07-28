const { Router } = require("express");
const router = Router();
const {
  getProductsPage,
  getProductsAddPage,
  addNewProduct,
  getProductsUpdatePage,
  updateProduct,
  deleteProduct,
  getProductDetailsPage,
} = require("../controllers/product.controller");
const { protected } = require("../middlewares/auth");
const { body } = require("express-validator");

// All
router.get("/", protected, getProductsPage);
// Details page
router.get("/:productId/details", protected, getProductDetailsPage);
// Create page
router.get("/add", protected, getProductsAddPage);
// Update page
router.get("/:productId/update", protected, getProductsUpdatePage);
// Create
router.post(
  "/add",
  [
    body("title", "Please enter a title")
      .notEmpty()
      .isLength({ min: 3, max: 255 }),
    body("image", "Please enter a valid image url").isURL(),
    body("description", "Please enter a description")
      .notEmpty()
      .isLength({ min: 3, max: 255 }),
    body("amount", "Please enter a valid amount").isNumeric(),
  ],
  protected,
  addNewProduct
);

// Update
router.post(
  "/:productId/update",
  [
    body("title", "Please enter a product")
      .notEmpty()
      .isLength({ min: 3, max: 255 }),
    body("image", "Please enter a valid image url").isURL(),
    body("description", "Please enter a description")
      .notEmpty()
      .isLength({ min: 3, max: 255 }),
    body("amount", "Please enter a valid amount").isNumeric(),
  ],
  protected,
  updateProduct
);

// Delete
router.get("/:productId/delete", protected, deleteProduct);

module.exports = router;
