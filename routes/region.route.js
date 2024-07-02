const { Router } = require("express");
const router = Router();
const { protected } = require("../middlewares/auth");
const {
  getRegionPage,
  getAddNewRegionPage,
  addNewRegion,
  deleteRegion,
} = require("../controllers/region.controller");
const { body } = require("express-validator");

// Regions
router.get("/", protected, getRegionPage);
router.get("/add", protected, getAddNewRegionPage);
router.post(
  "/add",
  [
    body("name", "Please enter a name")
      .notEmpty()
      .isLength({ min: 3, max: 255 }),
  ],
  protected,
  addNewRegion
);
router.get("/:id/delete", protected, deleteRegion);

module.exports = router;
