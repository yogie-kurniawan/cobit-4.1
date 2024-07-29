const express = require("express");
const router = express.Router();
const {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin");
const authenticateAdmin = require("../middleware/authenticateAdmin");

router.get("/", authenticateAdmin, getAdmins);
router.get("/:id", authenticateAdmin, getAdmin);
router.post("/create", authenticateAdmin, createAdmin);
router.patch("/:id/update", authenticateAdmin, updateAdmin);
router.delete("/:id/delete", authenticateAdmin, deleteAdmin);

export default router;
