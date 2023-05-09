require("../Models/childModel");
const mongoose = require("mongoose");
const ChildSchema = mongoose.model("children");

exports.getAllChildren = function (request, response, next) {
  ChildSchema.find({})
    .then((date) => {
      response.status(200).json(date);
    })
    .catch((error) => next(error));
};

exports.getChild = function (request, response, next) {
  ChildSchema.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Child Doesn't Exist");
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
exports.addChild = function (request, response, next) {
  obj = new ChildSchema({
    _id: request.body.id,
    fullname: request.body.fullname,
    age: request.body.age,
    level: request.body.level,
    address: {
      city: request.body.address.city,
      street: request.body.address.street,
      building: request.body.address.building,
    },
  });
  obj
    .save()
    .then((date) => {
      response.status(201).json(date);
    })
    .catch((error) => next(error));
};
exports.updateChild = function (request, response, next) {
  ChildSchema.updateOne(
    {
      _id: request.body.id,
    },
    {
      $set: {
        fullname: request.body.fullname,
        age: request.body.age,
        level: request.body.level,
        address: {
          city: request.body.address.city,
          street: request.body.address.street,
          building: request.body.address.building,
        },
      },
    }
  )
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.deleteChild = function (request, response, next) {
  ChildSchema.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Child Doesn't Exist");
      }
      response.status(200).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
