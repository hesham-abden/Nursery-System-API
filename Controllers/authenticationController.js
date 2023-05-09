const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("../Models/teacherModel");
const TeacherSchema = mongoose.model("teachers");
const adminPwHashed =
  "$2b$10$QoeRTNlQWiIiyaYW7vuSFOhd.ukI9xspJJ0IAwJS3VN6W7LEVf7Xu";
exports.login = function (request, response, next) {
  if (request.body != null) {
    if (
      request.body.email == "admin@admin.com" &&
      bcrypt.compareSync(request.body.password, adminPwHashed)
    ) {
      const admin = new TeacherSchema();
      TeacherSchema.findOne({ email: request.body.email })
        .then((data) => {
          admin._id = data._id;
          const token = jwt.sign(
            {
              id: admin.id,
              role: "admin",
            },
            "nurserySystem",
            { expiresIn: "1h" }
          );
          response.status(200).json({ data: "OK", token });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      TeacherSchema.findOne({ email: request.body.email })
        .then((teacher) => {
          if (
            teacher == null ||
            bcrypt.compareSync(request.body.password, teacher.password) == false
          )
            throw new Error("User name or password is incorrect");
          const token = jwt.sign(
            {
              id: teacher._id,
              fullname: teacher.fullname,
              role: "teacher",
            },
            "nurserySystem",
            { expiresIn: "1h" }
          );
          response.status(200).json({ data: "OK", token });
        })
        .catch((err) => {
          next(err);
        });
    }
  }
};
