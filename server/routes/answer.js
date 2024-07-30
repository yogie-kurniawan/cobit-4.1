import express from "express";
const router = express.Router();
import {
  getAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answer.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

router.get("/", authenticateAdmin, getAnswers);
router.get("/:id", authenticateAdmin, getAnswer);
router.post("/create", authenticateAdmin, createAnswer);
router.patch("/:id/update", authenticateAdmin, updateAnswer);
router.delete("/:id/delete", authenticateAdmin, deleteAnswer);

export default router;
