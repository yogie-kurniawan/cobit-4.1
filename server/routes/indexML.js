import express from "express";
const router = express.Router();
import { getIndexes } from "../controllers/indexML.js";
import authenticateAdmin from "../middleware/authenticateAdmin.js";

router.get("/", authenticateAdmin, getIndexes);

export default router;
