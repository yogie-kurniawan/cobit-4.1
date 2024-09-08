import Question from "../models/Question.js";
import mongoose from "mongoose";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "proses",
          localField: "idProses",
          foreignField: "_id",
          as: "process",
        },
      },
      {
        $unwind: {
          path: "$process", // Deconstructs the author array field from the input documents to output a document for each element
          preserveNullAndEmptyArrays: true, // Output documents with empty arrays or missing authors
        },
      },
    ]);
    return res.status(200).json({
      questions,
      status: "success",
      message: "Berhasil menangkap semua pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const getQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    const question = await Question.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: "proses",
          localField: "idProses",
          foreignField: "_id",
          as: "process",
        },
      },
      {
        $unwind: {
          path: "$process", // Deconstructs the author array field from the input documents to output a document for each element
          preserveNullAndEmptyArrays: true, // Output documents with empty arrays or missing authors
        },
      },
    ]);

    if (question.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Pertanyaan tidak ditemukan!",
      });
    }
    const firstQuestion = question[0];

    return res.status(200).json({
      question: firstQuestion,
      status: "success",
      message: "Berhasil menangkap pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  const { proses, pertanyaan } = req.body;
  const newQuestion = new Question({ idProses: proses, pertanyaan });

  try {
    await newQuestion.save();
    return res.status(201).json({
      question: newQuestion,
      status: "success",
      message: "Berhasil menyimpan pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.body);
  const { process, pertanyaan } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      _id,
      { processId: process, pertanyaan },
      {
        new: true,
      }
    );
    return res.status(200).json({
      question: updatedQuestion,
      status: "success",
      message: "Berhasil memperbaharui pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    await Question.findByIdAndDelete(id);
    res.status(200).json({
      id,
      status: "success",
      message: "Berhasil menghapus pertanyaan!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
