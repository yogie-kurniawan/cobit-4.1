import Domain from "../models/Domain.js";
import mongoose from "mongoose";

export const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find({});
    return res.status(200).json({
      domains,
      status: "success",
      message: "Berhasil menangkap semua domain!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const getDomain = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    const domain = await Domain.findById(id);
    return res.status(200).json({
      domain,
      status: "success",
      message: "Berhasil menangkap domain!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const createDomain = async (req, res) => {
  const { kode, nama, deskripsi } = req.body;
  if (!kode || !nama) {
    return res.status(400).json({
      status: "error",
      message: "Kode dan nama harus diisi!",
    });
  }
  try {
    const newDomain = new Domain({ kode, nama, deskripsi });
    await newDomain.save();
    return res.status(201).json({
      domain: newDomain,
      status: "success",
      message: "Berhasil menyimpan domain!",
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "Domain dengan kode tersebut sudah ada!",
      });
    }
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateDomain = async (req, res) => {
  const { id: _id } = req.params;
  const { kode, nama, deskripsi } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    const updatedDomain = await Domain.findByIdAndUpdate(
      _id,
      { kode, nama, deskripsi },
      {
        new: true,
      }
    );
    return res.status(200).json({
      domain: updatedDomain,
      status: "success",
      message: "Berhasil memperbaharui domain!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteDomain = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    await Domain.findByIdAndDelete(id);
    res
      .status(200)
      .json({ id, status: "success", message: "Berhasil menghapus domain!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
