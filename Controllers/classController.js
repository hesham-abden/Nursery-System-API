require("../Models/classModel");
const mongoose = require("mongoose");
const ClassSchema = mongoose.model("classes");

exports.getAllClasses = function (request, response, next) {
  ClassSchema.find({})
    .populate({ path: "children", select: { fullname: 1 } })
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .then((date) => {
      response.status(200).json(date);
    })
    .catch((error) => next(error));
};

exports.getClass = function (request, response, next) {
  ClassSchema.findOne({ _id: request.params.id })
    .populate({ path: "children", select: { fullname: 1 } })
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .then((data) => {
      if (data == null) throw new Error("Class Doesn't Exist");
      else if (
        data.supervisor._id != request.decodedToken.id &&
        request.decodedToken.role != "admin"
      ) {
        {
          throw new Error("You don't have access to this class");
        }
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
exports.addClass = function (request, response, next) {
  if (
    (request.body.supervisor = request.decodedToken.id) &&
    request.decodedToken.role != "admin"
  ) {
    {
      throw new Error("You don't have access to this class");
    }
  }
  obj = new ClassSchema({
    _id: request.body.id,
    name: request.body.name,
    supervisor: request.body.supervisor,
    children: request.body.children,
  });

  obj
    .save()
    .then((date) => {
      response.status(201).json(date);
    })
    .catch((error) => next(error));
};

exports.updateClass = function (request, response, next) {
  if (
    request.body.supervisor != request.decodedToken.id &&
    request.decodedToken.role != "admin"
  ) {
    {
      throw new Error("You don't have access to this class");
    }
  }
  ClassSchema.updateOne(
    {
      _id: request.body.id,
    },
    {
      $set: {
        name: request.body.name,
        supervisor: request.body.supervisor,
        children: request.body.children,
      },
    }
  )
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.deleteClass = function (request, response, next) {
  ClassSchema.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Class Doesn't Exist");
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClassChildren = function (request, response, next) {
  ClassSchema.findOne({ _id: request.params.id }, { children: 1 })
    .populate({ path: "children" })
    .then((data) => {
      if (data == null) {
        throw new Error("Class Doesn't Exist");
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getClassTeacher = function (request, response, next) {
  ClassSchema.findOne({ _id: request.params.id }, { supervisor: 1 })
    .populate({ path: "supervisor" })
    .then((data) => {
      if (data == null) {
        throw new Error("Class Doesn't Exist");
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
