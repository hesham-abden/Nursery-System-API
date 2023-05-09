const express = require("express");
const router = express.Router();
const controller = require("../Controllers/childController");
router
  .route("/child")
  .get(controller.getAllChildren)
  .post(controller.addChild)
  .put(controller.updateChild);
router
  .route("/Child/:id")
  .get(controller.getChild)
  .delete(controller.deleteChild);

module.exports = router;
