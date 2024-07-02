const { Router } = require("express");
const router = Router();
const { protected } = require("../middlewares/auth");
const {
  getRegionPage,
  getAddNewRegionPage,
} = require("../controllers/region.controller");

// Regions
router.get("/", protected, getRegionPage);
router.get("/add", protected, getAddNewRegionPage);

module.exports = router;
