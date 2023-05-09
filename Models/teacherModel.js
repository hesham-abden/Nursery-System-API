const mongoose = require("mongoose");
let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
const schema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  fullname: { type: String, max: 20, min: 3, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, match: regex, required: true },
  image: { type: String, required: true },
});

mongoose.model("teachers", schema);
