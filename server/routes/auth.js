import express from "express";
const router = express.Router();
import { handleLogin, handleRegister, logout } from "../controllers/auth.js";
import authenticate from "../middleware/authenticateAdmin.js";

router.post("/login", handleLogin);
router.post("/register", handleRegister);
router.get("/logout", authenticate, logout);

export default router;
