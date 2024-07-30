import mongoose from "mongoose";

const GapSchema = mongoose.Schema(
  {
    kodeIndikator: {
      type: String,
      required: true,
    },
    indexSekarang: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    diharapkan: {
      type: Number,
      required: true,
    },
    gap: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gap", GapSchema);
