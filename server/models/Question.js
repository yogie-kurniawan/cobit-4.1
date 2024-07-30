import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema(
  {
    kodeIndikator: {
      type: String,
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
