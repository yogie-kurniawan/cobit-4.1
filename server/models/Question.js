const mongoose = require("mongoose");

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

module.exports = mongoose.model("Question", QuestionSchema);
