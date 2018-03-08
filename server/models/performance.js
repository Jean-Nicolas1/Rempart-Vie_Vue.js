const mongoose = require("mongoose");
const { Schema } = mongoose;

const performanceSchema = new Schema({
  month: String,
  perf: Number
});

module.exports = mongoose.model("Perf", performanceSchema);
