const { Router } = require("express");
const { guest } = require("../middlewares/auth");
const { getHomePage } = require("../controllers/public.controller");
const router = Router();

// Home
router.get("/", guest, getHomePage);

module.exports = router;
