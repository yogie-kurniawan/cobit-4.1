import express from "express";
const router = express.Router();
import {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

router.get("/", authenticateAdmin, getAdmins);
router.get("/:id", authenticateAdmin, getAdmin);
router.post("/create", authenticateAdmin, createAdmin);
router.patch("/:id/update", authenticateAdmin, updateAdmin);
router.delete("/:id/delete", authenticateAdmin, deleteAdmin);

export default router;
