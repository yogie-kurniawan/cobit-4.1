import User from "../models/User.js";
import mongoose from "mongoose";
import hashPassword from "../utils/hashPassword.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      users,
      status: "success",
      message: "Berhasil menangkap semua user!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    const user = await User.findById(_id);
    return res
      .status(200)
      .json({ user, status: "success", message: "Berhasil menangkap User!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const createUser = async (req, res) => {
  let { nama, username, email, password } = req.body;

  try {
    password = await hashPassword(password);
    const newUser = new User({ nama, username, email, password });
    await newUser.save();
    return res.status(201).json({
      user: newUser,
      status: "success",
      message: "Berhasil menyimpan User!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  let { nama, username, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  let updatedUser = {};
  try {
    if (password && password !== "") {
      password = await hashPassword(password);
      updatedUser = await User.findByIdAndUpdate(
        _id,
        { nama, username, email, password },
        {
          new: true,
        }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        _id,
        { nama, username, email },
        {
          new: true,
        }
      );
    }

    return res.status(200).json({
      user: updatedUser,
      status: "success",
      message: "Berhasil memperbaharui User!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: "error", message: "Id tidak valid!" });

  try {
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ id, status: "success", message: "Berhasil menghapus User!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
