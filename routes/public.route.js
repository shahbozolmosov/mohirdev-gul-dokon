const { Router } = require("express");
const { guest } = require("../middlewares/auth");
const {
  getHomePage,
  getProductDetailsPage,
} = require("../controllers/public.controller");
const router = Router();

// Home
router.get("/", guest, getHomePage);
router.get("/:productId/details", guest, getProductDetailsPage);

module.exports = router;
