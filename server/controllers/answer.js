const Answer = require("../models/Answer");

export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({});
    return res
      .status(200)
      .json({ answers, message: "Berhasil menangkap semua pertanyaan!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getAnswer = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const answer = await Answer.findById(id);
    return res
      .status(200)
      .json({ answer, message: "Berhasil menangkap pertanyaan!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const createAnswer = async (req, res) => {
  const { idUser, idPertanyaan, kodeIndikator, nilaiHuruf, nilaiAngka } =
    req.body;
  const newAnswer = new Answer({
    idUser,
    idPertanyaan,
    kodeIndikator,
    nilaiHuruf,
    nilaiAngka,
  });

  try {
    await newAnswer.save();
    return res.status(201).json({
      Answer: newAnswer,
      message: "Berhasil menyimpan pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { idUser, idPertanyaan, kodeIndikator, nilaiHuruf, nilaiAngka } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      _id,
      { idUser, idPertanyaan, kodeIndikator, nilaiHuruf, nilaiAngka },
      {
        new: true,
      }
    );
    return res.status(200).json({
      Answer: updatedAnswer,
      message: "Berhasil memperbaharui pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAnswer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    await Answer.findByIdAndDelete(id);
    res.status(200).json({ message: "Berhasil menghapus Answer!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
