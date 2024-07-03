const Router = require("express");
const router = Router();
const { protected } = require("../middlewares/auth");
const { getNotifPage } = require("../controllers/notif.controller");

router.get("/", protected, getNotifPage);

module.exports = router;
