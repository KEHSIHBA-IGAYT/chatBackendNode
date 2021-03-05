const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");

router.get("/getUser", controller.getUser);
router.post("/setUser", controller.setUser);
router.delete("/clearUser", controller.clearUser);

module.exports = router;
