import Admin from "../models/Admin.js";
import hashPassword from "../utils/hashPassword.js";
import mongoose from "mongoose";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    return res.status(200).json({
      admins,
      status: "success",
      message: "Berhasil menangkap semua admin!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    const admin = await Admin.findById(id);
    if (admin.length === 0) {
      throw new Error("Admin tidak ditemukan!");
    }
    return res
      .status(200)
      .json({ admin, status: "success", message: "Berhasil menangkap admin!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  let { nama, username, email, password, noTelepon } = req.body;

  try {
    password = await hashPassword(password);
    const newAdmin = new Admin({ nama, username, email, password, noTelepon });

    await newAdmin.save();
    return res.status(201).json({
      admin: newAdmin,
      status: "success",
      message: "Berhasil menyimpan admin!",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "Admin dengan username tersebut sudah ada!",
      });
    }

    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const { id: _id } = req.params;
  let { nama, username, email, password } = req.body;
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    password = await hashPassword(password);
    const updatedAdmin = await Admin.findByIdAndUpdate(
      _id,
      { nama, username, email, password },
      {
        new: true,
      }
    );
    return res.status(200).json({
      admin: updatedAdmin,
      status: "success",
      message: "Berhasil memperbaharui admin!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    await Admin.findByIdAndDelete(id);
    res
      .status(200)
      .json({ id, status: "success", message: "Berhasil menghapus admin!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
