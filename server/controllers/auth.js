import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const handleRegister = async (req, res) => {
  const { nama, username, password, noTelepon } = req.body;
  console.log(req.body);

  // Validation
  if (!nama) {
    return res
      .status(400)
      .json({ status: "error", message: "Nama harus diisi!" });
  }
  if (!username) {
    return res
      .status(400)
      .json({ status: "error", message: "Username harus diisi!" });
  }
  if (!password) {
    return res.status(400).json({ status: "error", message: " harus diisi!" });
  }
  if (!noTelepon) {
    return res
      .status(400)
      .json({ status: "error", message: "No Telepon harus diisi!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      nama,
      username,
      password: hashedPassword,
      noTelepon,
    });

    const save = await newUser.save();
    return res.status(201).json({ user: save });
  } catch (err) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern)[0];
      return res.status(409).json({
        status: "error",
        message: `Duplikat nilai untuk ${duplicateField}`,
      });
    }
    return res.status(400).json({ status: "error", message: err.message });
  }
};

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ status: "error", message: "Username harus diisi!" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ status: "error", message: "Password harus diisi!" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User tidak ditemukan!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "error", message: "Password salah!" });
    }
    const token =
      "Bearer " +
      jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
    // res.cookie("token", token, {
    //   maxAge: 24 * 60 * 60 * 1000,
    //   secure: true,
    //   httpOnly: true,
    // });
    return res
      .status(200)
      .json({ status: "success", message: "Berhasil login!", token });
  } catch (error) {
    return res
      .status(400)
      .json({ status: "success", message: "Gagal login, silahkan coba lagi!" });
  }
};

export const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie("token");
  return res.redirect("/login");
};
