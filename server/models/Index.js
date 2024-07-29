const mongoose = require("mongoose");

const IndexSchema = mongoose.Schema(
  {
    kodeIndikator: {
      type: String,
      required: true,
    },
    totalPertanyaan: {
      type: Number,
      required: true,
    },
    jumlahSkorDomain: {
      type: Number,
      required: true,
    },
    indexSekarang: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Index", IndexSchema);
