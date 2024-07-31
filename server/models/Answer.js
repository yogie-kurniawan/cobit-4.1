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
    nilai: {
      type: Number,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);
