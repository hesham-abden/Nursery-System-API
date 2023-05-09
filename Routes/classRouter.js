const express = require("express");
const router = express.Router();
const controller = require("../Controllers/classController");
const {
  checkTeacher,
  checkAdmin,
} = require("./../Middlewares/authenticationMW");
router
  .route("/class")
  .all(checkTeacher)
  .get(controller.getAllClasses)
  .post(controller.addClass)
  .put(controller.updateClass);
router
  .route("/class/:id")
  .all(checkTeacher)
  .get(controller.getClass)
  .delete(controller.deleteClass);
router.get("/classchildren/:id", checkAdmin, controller.getClassChildren);
router.get("/classteacher/:id", checkAdmin, controller.getClassTeacher);

module.exports = router;
