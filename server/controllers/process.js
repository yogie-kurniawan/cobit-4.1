import Process from "../models/Process.js";
import mongoose from "mongoose";

export const getProcesss = async (req, res) => {
  try {
    const processes = await Process.aggregate([
      {
        $lookup: {
          from: "domains",
          localField: "idDomain",
          foreignField: "_id",
          as: "domain",
        },
      },
      {
        $unwind: "$domain",
      },
    ]);
    console.log(processes);
    return res
      .status(200)
      .json({ processes, message: "Berhasil menangkap semua proses!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getProcess = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const process = await Process.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: "domains",
          localField: "idDomain",
          foreignField: "_id",
          as: "domain",
        },
      },
      {
        $unwind: "$domain",
      },
    ]);
    if (process.length === 0) {
      return res.status(404).json({
        message: "Pertanyaan tidak ditemukan!",
      });
    }
    const firstProcess = process[0];
    return res
      .status(200)
      .json({ process: firstProcess, message: "Berhasil menangkap proses!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const createProcess = async (req, res) => {
  const { idDomain, kode, nama, deskripsi } = req.body;
  const newProcess = new Process({ idDomain, kode, nama, deskripsi });

  try {
    await newProcess.save();
    return res.status(201).json({
      process: newProcess,
      message: "Berhasil menyimpan proses!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateProcess = async (req, res) => {
  const { id: _id } = req.params;
  const { kodeIndikator, Process } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const updatedProcess = await Process.findByIdAndUpdate(
      _id,
      { kodeIndikator, Process },
      {
        new: true,
      }
    );
    return res.status(200).json({
      process: updatedProcess,
      message: "Berhasil memperbaharui proses!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteProcess = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    await Process.findByIdAndDelete(id);
    res.status(200).json({ message: "Berhasil menghapus proses!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
