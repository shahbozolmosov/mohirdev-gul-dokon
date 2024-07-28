const { Router } = require("express");
const { guest } = require("../middlewares/auth");
const {
  getHomePage,
  getProductDetailsPage,
  addCommentToProduct,
} = require("../controllers/public.controller");
const router = Router();

// Home
router.get("/", guest, getHomePage);
router.get("/:productId/details", guest, getProductDetailsPage);
router.post("/:productId/comment", guest, addCommentToProduct);

module.exports = router;
