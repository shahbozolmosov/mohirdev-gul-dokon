const { Router } = require("express");
const router = Router();
const {
  getProductsPage,
  getProductsAddPage,
  addNewProduct,
  getProductsUpdatePage,
} = require("../controllers/product.controller");
const { protected } = require("../middlewares/auth");
const { body } = require("express-validator");

// Products
router.get("/", protected, getProductsPage);
router.get("/add", protected, getProductsAddPage);
router.get("/:productId/update", protected, getProductsUpdatePage);
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
    body("amount", "Please enter a valid amount")
      .isNumeric(),
  ],
  protected,
  addNewProduct
);
router.post("/:productId/update", protected, getProductsUpdatePage);

module.exports = router;
