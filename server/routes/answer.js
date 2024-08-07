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

export default router;
