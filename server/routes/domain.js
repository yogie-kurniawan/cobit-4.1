import express from "express";
const router = express.Router();
import {
  getDomains,
  getDomain,
  createDomain,
  updateDomain,
  deleteDomain,
} from "../controllers/domain.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

router.get("/", authenticateAdmin, getDomains);
router.get("/:id", authenticateAdmin, getDomain);
router.post("/create", authenticateAdmin, createDomain);
router.patch("/:id/update", authenticateAdmin, updateDomain);
router.delete("/:id/delete", authenticateAdmin, deleteDomain);

export default router;
