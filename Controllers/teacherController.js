const mongoose = require("mongoose");
require("../Models/teacherModel");
const bcrypt = require("bcrypt");
const TeacherSchema = mongoose.model("teachers");

exports.getAllTeacher = function (request, response, next) {
  TeacherSchema.find({})
    .then((date) => {
      response.status(200).json(date);
    })
    .catch((error) => next(error));
};

exports.getTeacher = function (request, response, next) {
  TeacherSchema.findOne({ fullname: request.params.fullname })
    .then((data) => {
      if (data == null) {
        throw new Error("Teacher Doesn't Exist");
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
exports.addTeacher = function (request, response, next) {
  saltRounds = 10;
  const hashed = bcrypt.hashSync(request.body.password, saltRounds);
  obj = new TeacherSchema({
    fullname: request.body.fullname,
    password: hashed,
    email: request.body.email,
    image: request.body.image,
  });
  obj
    .save()
    .then((date) => {
      response.status(201).json(date);
    })
    .catch((error) => next(error));
};

exports.updateTeacher = function (request, response, next) {
  TeacherSchema.updateOne(
    {
      fullname: request.body.fullname,
    },
    {
      $set: {
        password: request.body.password,
        email: request.body.email,
        image: request.body.image,
      },
    }
  )
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = function (request, response) {
  TeacherSchema.deleteOne({ fullname: request.params.fullname })
    .then((data) => {
      if (data == null) {
        throw new Error("Teacher Doesn't Exist");
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
