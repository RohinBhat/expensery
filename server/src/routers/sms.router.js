const express = require("express");
const router = express.Router();

const { parseSMS, validateHeader } = require("../controllers/sms.controller");

router.post("/parse", parseSMS);
router.post("/validate", validateHeader);

module.exports = router;
