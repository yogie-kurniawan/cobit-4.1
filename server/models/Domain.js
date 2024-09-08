import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  kode: { type: String, required: true, unique: true, max: 50 },
  nama: { type: String, required: true, max: 50 },
  deskripsi: { type: String },
});

export default mongoose.model("Domain", domainSchema);
