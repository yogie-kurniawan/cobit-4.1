const mongoose = require("mongoose");

const prosesSchema = new mongoose.Schema({
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domain",
    required: true,
  },
  nama: { type: String, required: true },
  description: { type: String },
});

const Proses = mongoose.model("Proses", prosesSchema);
module.exports = Proses;
