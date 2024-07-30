import express from "express";
const router = express.Router();
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

router.get("/", authenticateAdmin, getUsers);
router.get("/:id", authenticateAdmin, getUser);
router.post("/create", authenticateAdmin, createUser);
router.patch("/:id/update", authenticateAdmin, updateUser);
router.delete("/:id/delete", authenticateAdmin, deleteUser);

export default router;
