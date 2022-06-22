const express = require("express");
const router = express.Router();

const { parseSMS } = require("../controllers/sms.controller");

router.post("/parse", parseSMS);

module.exports = router;
