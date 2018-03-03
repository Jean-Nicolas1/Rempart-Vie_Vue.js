const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  investmentObjective: String,
  familySituation: String
});

module.exports = mongoose.model("Form", formSchema);
