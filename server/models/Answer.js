import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    idPertanyaan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pertanyaan",
      required: true,
    },
    kodeIndikator: {
      type: String,
      required: true,
    },
    nilaiHuruf: {
      type: String,
      required: true,
    },
    nilaiAngka: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);
