const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  investmentObjective: String
});

module.exports = mongoose.model("Form", formSchema);
