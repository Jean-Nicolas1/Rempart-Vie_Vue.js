const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  investmentObjective: String,
  investmentHorizon: String,
  gestionMode: String,
  fiscalResidenceA: String,
  fiscalResidenceB: String,
  fiscalResidenceC: String,
  fiscalResidenceD: String,
  fiscalResidenceStatus: String,
  familySituation: String,
  salary: String
});

module.exports = mongoose.model("Form", formSchema);
