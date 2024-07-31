import Domain from "../models/Domain.js";
import mongoose from "mongoose";

export const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find({});
    return res
      .status(200)
      .json({ domains, message: "Berhasil menangkap semua domain!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getDomain = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const domain = await Domain.findById(id);
    return res
      .status(200)
      .json({ domain, message: "Berhasil menangkap domain!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const createDomain = async (req, res) => {
  const { kode, nama, deskripsi } = req.body;
  const newDomain = new Domain({ kode, nama, deskripsi });

  try {
    await newDomain.save();
    return res.status(201).json({
      domain: newDomain,
      message: "Berhasil menyimpan domain!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateDomain = async (req, res) => {
  const { id: _id } = req.params;
  const { kodeIndikator, domain } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const updatedDomain = await Domain.findByIdAndUpdate(
      _id,
      { kodeIndikator, domain },
      {
        new: true,
      }
    );
    return res.status(200).json({
      domain: updatedDomain,
      message: "Berhasil memperbaharui domain!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteDomain = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    await Domain.findByIdAndDelete(id);
    res.status(200).json({ message: "Berhasil menghapus domain!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
