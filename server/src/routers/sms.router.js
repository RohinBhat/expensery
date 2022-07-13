const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const { parseSMS, validateHeader } = require("../controllers/sms.controller");

router.post("/parse", auth, parseSMS);
router.post("/validate", auth, validateHeader);

module.exports = router;
