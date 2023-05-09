const express = require("express");
const controller = require("../Controllers/teacherController");
const { checkAdmin } = require("./../Middlewares/authenticationMW");
const router = express.Router();
router
  .route("/teachers")
  .all(checkAdmin)
  .get(controller.getAllTeacher)
  .post(controller.addTeacher)
  .put(controller.updateTeacher);
router
  .route("/teachers/:fullname")
  .all(checkAdmin)
  .get(controller.getTeacher)
  .delete(controller.deleteTeacher);

module.exports = router;
