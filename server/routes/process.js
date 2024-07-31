import express from "express";
const router = express.Router();
import {
  getProcesss,
  getProcess,
  createProcess,
  updateProcess,
  deleteProcess,
} from "../controllers/process.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

router.get("/", authenticateAdmin, getProcesss);
router.get("/:id", authenticateAdmin, getProcess);
router.post("/create", authenticateAdmin, createProcess);
router.patch("/:id/update", authenticateAdmin, updateProcess);
router.delete("/:id/delete", authenticateAdmin, deleteProcess);

export default router;
