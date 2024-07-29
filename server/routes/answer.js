const express = require("express");
const router = express.Router();
const {
  getAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} = require("../controllers/answer");
const authenticateAdmin = require("../middleware/authenticateAdmin");

router.get("/", authenticateAdmin, getAnswers);
router.get("/:id", authenticateAdmin, getAnswer);
router.post("/create", authenticateAdmin, createAnswer);
router.patch("/:id/update", authenticateAdmin, updateAnswer);
router.delete("/:id/delete", authenticateAdmin, deleteAnswer);

export default router;
