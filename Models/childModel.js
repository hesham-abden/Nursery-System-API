const mongoose = require("mongoose");
const { AutoIncrementID } = require("@typegoose/auto-increment");
const schema = new mongoose.Schema({
  _id: Number,
  fullname: { type: String, max: 20, min: 3, required: true, unique: true },
  age: { type: String, required: true },
  level: {
    enum: { values: ["PreKG", "KG1", "KG2"] },
    type: String,
    required: true,
  },
  address: { city: String, street: String, building: String },
});

schema.plugin(AutoIncrementID, {});

mongoose.model("children", schema);
