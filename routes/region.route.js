const { Router } = require("express");
const router = Router();
const { protected } = require("../middlewares/auth");
const { getRegionPage } = require("../controllers/region.controller");

// Regions
router.get("/", protected, getRegionPage);

module.exports = router;