const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, max: 20, min: 3, required: true, unique: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
  children: [{ type: Number, ref: "children" }],
});

mongoose.model("classes", schema);
