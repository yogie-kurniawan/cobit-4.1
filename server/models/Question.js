import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema(
  {
    idProses: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    pertanyaan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
