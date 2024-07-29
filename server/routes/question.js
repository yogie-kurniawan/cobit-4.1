const express = require("express");
const router = express.Router();
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/question");
const authenticateAdmin = require("../middleware/authenticateAdmin");

router.get("/", authenticateAdmin, getQuestions);
router.get("/:id", authenticateAdmin, getQuestion);
router.post("/create", authenticateAdmin, createQuestion);
router.patch("/:id/update", authenticateAdmin, updateQuestion);
router.delete("/:id/delete", authenticateAdmin, deleteQuestion);

export default router;
