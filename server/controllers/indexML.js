import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

const getMaturityLevel = (valueTotal, questionNumber) => {
  const maturityLevel = valueTotal / questionNumber;
  return Math.round(maturityLevel * 100) / 100;
};

export const getIndexes = async (req, res) => {
  try {
    const answers = await Answer.find({});
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "proses",
          localField: "idProses",
          foreignField: "_id",
          as: "proses",
        },
      },
      {
        $unwind: "$proses",
      },
    ]);
    let indexes = [];
    questions.forEach((question) => {
      let nilai = 0;
      answers.forEach((answer) => {
        if (answer.idPertanyaan.equals(question._id)) {
          nilai += answer.nilai;
        }
      });
      let maturityLevel = getMaturityLevel(nilai, questions.length);
      indexes.push({
        proses: question.proses.kode,
        jumlahNilai: nilai,
        maturityLevel,
        index: maturityLevel,
        pertanyaan: question.pertanyaan,
      });
    });

    return res.status(200).json({ indexes, status: "success", message: "@" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
