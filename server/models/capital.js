const mongoose = require("mongoose");
const { Schema } = mongoose;

const capitalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  investedCapital: Number,
  durationType: String,
  operations: Array
});

module.exports = mongoose.model("Capital", capitalSchema);
