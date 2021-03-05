const express = require("express");
const router = express.Router();
const controller = require("../controllers/chats");

router.get("/getChat", controller.getChat);

module.exports = router;
