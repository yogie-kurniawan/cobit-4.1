import Admin from "../models/Admin.js";
import hashPassword from "../utils/hashPassword.js";
import mongoose from "mongoose";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    return res
      .status(200)
      .json({ admins, message: "Berhasil menangkap semua admin!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const admin = await Admin.findById(id);
    if (admin.length === 0) {
      throw new Error("Admin tidak ditemukan!");
    }
    return res
      .status(200)
      .json({ admin, message: "Berhasil menangkap admin!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  let { nama, username, email, password } = req.body;

  try {
    password = await hashPassword(password);
    const newAdmin = new Admin({ nama, username, email, password });

    await newAdmin.save();
    return res
      .status(201)
      .json({ admin: newAdmin, message: "Berhasil menyimpan admin!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const { id: _id } = req.params;
  let { nama, username, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

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
      message: "Berhasil memperbaharui admin!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Berhasil menghapus admin!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
