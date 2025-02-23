import Answer from "../models/Answer.js";
import mongoose from "mongoose";

export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user", // Deconstructs the author array field from the input documents to output a document for each element
          preserveNullAndEmptyArrays: true, // Output documents with empty arrays or missing authors
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "idPertanyaan",
          foreignField: "_id",
          as: "question",
        },
      },
      {
        $unwind: {
          path: "$question", // Deconstructs the author array field from the input documents to output a document for each element
          preserveNullAndEmptyArrays: true, // Output documents with empty arrays or missing authors
        },
      },
      {
        $sort: {
          idUser: -1, // Sort by idUser in ascending order (use -1 for descending order)
        },
      },
    ]);
    return res.status(200).json({
      answers,
      status: "success",
      message: "Berhasil menangkap semua pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const getAnswer = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    const answer = await Answer.findById(id);
    return res.status(200).json({
      answer,
      status: "success",
      message: "Berhasil menangkap pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const createAnswer = async (req, res) => {
  const { user, pertanyaan, nilai } = req.body;
  const newAnswer = new Answer({
    idUser: user,
    idPertanyaan: pertanyaan,
    nilai,
  });

  try {
    await newAnswer.save();
    return res.status(201).json({
      answer: newAnswer,
      status: "success",
      message: "Berhasil menyimpan pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { idUser, idPertanyaan, kodeIndikator, nilaiHuruf, nilaiAngka } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

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
      status: "success",
      message: "Berhasil memperbaharui pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteAnswer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    await Answer.findByIdAndDelete(id);
    res
      .status(200)
      .json({ id, status: "success", message: "Berhasil menghapus Answer!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
