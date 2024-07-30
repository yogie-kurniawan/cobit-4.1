import mongoose from "mongoose";

const prosesSchema = new mongoose.Schema({
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domain",
    required: true,
  },
  kode: { type: String, required: true },
  nama: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model("Proses", prosesSchema);
