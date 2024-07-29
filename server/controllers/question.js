const Question = require("../models/Question");

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    return res
      .status(200)
      .json({ questions, message: "Berhasil menangkap semua pertanyaan!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const question = await Question.findById(id);
    return res
      .status(200)
      .json({ question, message: "Berhasil menangkap pertanyaan!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  const { idUser, pertanyaan } = req.body;
  const newQuestion = new Question({ kodeIndikator, pertanyaan });

  try {
    await newQuestion.save();
    return res.status(201).json({
      question: newQuestion,
      message: "Berhasil menyimpan pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { kodeIndikator, pertanyaan } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      _id,
      { kodeIndikator, pertanyaan },
      {
        new: true,
      }
    );
    return res.status(200).json({
      question: updatedQuestion,
      message: "Berhasil memperbaharui pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Berhasil menghapus Question!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
