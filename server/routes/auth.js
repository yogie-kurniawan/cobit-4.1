import express from "express";
const router = express.Router();
import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
} from "../controllers/auth.js";
import authenticate from "../middleware/authenticateAdmin.js";

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/logout", authenticate, logout);

export default router;
