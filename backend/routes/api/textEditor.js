const express = require("express");
const texteditorController = require("../../controllers/texteditorController");
const router = express.Router();
const varifyRoles = require("../../middleware/varifyRoles");
const ROLES_LIST = require("../../config/rolleslist");

router
  .route("/file")
  .get(texteditorController.getFile)
  .post(varifyRoles(ROLES_LIST.User), texteditorController.postFile);

router
  .route("/commit")
  .post(varifyRoles(ROLES_LIST.User), texteditorController.saveContent);

module.exports = router;
