import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const getRegister = (req, res) => {
  return res.render("pages/register");
};

export const postRegister = async (req, res) => {
  const { name, username, password, email } = req.body;
  let errors = {};

  // Validation
  if (!name) {
    errors.name = { msg: "Name is required!" };
  }
  if (!username) {
    errors.username = { msg: "Username is required!" };
  }
  if (!email) {
    errors.email = { msg: "Email is required!" };
  }
  if (email) {
    const regexCode =
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';
    if (!username.match(regexCode)) {
      errors.username = { msg: "Email is not valid" };
    }
  }
  if (!password) {
    errors.password = { msg: "Password is required!" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const save = await newAdmin.save();
    if (save) {
      return res.status(201).json({ user: save });
    } else {
      throw new Error("Failed to register!");
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getLogin = (req, res) => {
  return res.render("pages/login");
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  let errors = [];
  if (!username) errors.push({ msg: "Username is required!" });
  if (!password) errors.push({ msg: "Password is required" });

  if (errors.length > 0) {
    return res.render("pages/login", {
      errors,
      username,
    });
  }
  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      req.session.error = "User not found";
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, Admin.password);

    if (!isMatch) {
      req.session.error = "Password is incorrect!";
      return res.redirect("/login");
    }
    const token =
      "Bearer " +
      jwt.sign(
        {
          id: Admin._id,
          username: Admin.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
    });
    req.session.success = "Login successful!";
    return res.redirect("/");
  } catch (error) {
    req.session.error = "There was something wrong, try again!";
    return res.redirect("/login");
  }
};

export const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie("token");
  return res.redirect("/login");
};
