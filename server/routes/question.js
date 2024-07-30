import express from "express";
const router = express.Router();
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

router.get("/", authenticateAdmin, getQuestions);
router.get("/:id", authenticateAdmin, getQuestion);
router.post("/create", authenticateAdmin, createQuestion);
router.patch("/:id/update", authenticateAdmin, updateQuestion);
router.delete("/:id/delete", authenticateAdmin, deleteQuestion);

export default router;
