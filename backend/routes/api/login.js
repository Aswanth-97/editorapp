const express = require("express");
const { handileLogin } = require("../../controllers/authController");
const router = express.Router();

router.post("/", handileLogin);

module.exports = router;
