const mongoose = require("mongoose");
const { Schema } = mongoose;

const capitalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  validationStatus: String,
  investedCapital: Number,
  durationType: String
});

module.exports = mongoose.model("Capital", capitalSchema);
