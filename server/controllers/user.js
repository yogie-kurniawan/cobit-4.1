import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res
      .status(200)
      .json({ users, message: "Berhasil menangkap semua user!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const user = await User.findById(id);
    return res.status(200).json({ user, message: "Berhasil menangkap User!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { nama, username, email, password } = req.body;
  const newUser = new User({ nama, username, email, password });

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ User: newUser, message: "Berhasil menyimpan User!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const { nama, username, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { nama, username, email, password },
      {
        new: true,
      }
    );
    return res.status(200).json({
      User: updatedUser,
      message: "Berhasil memperbaharui User!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Id tidak valid!" });

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Berhasil menghapus User!" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
