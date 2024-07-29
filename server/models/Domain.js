const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  description: { type: String },
});

const Domain = mongoose.model("Domain", domainSchema);
module.exports = Domain;
