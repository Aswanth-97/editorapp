const express = require("express");
const texteditorController = require("../../controllers/texteditorController");
const router = express.Router();
const varifyRoles = require("../../middleware/varifyRoles");
const ROLES_LIST = require("../../config/rolleslist");

router
  .route("/text")
  .get(texteditorController.getText)
  .post(varifyRoles(ROLES_LIST.User), texteditorController.postText);

module.exports = router;
