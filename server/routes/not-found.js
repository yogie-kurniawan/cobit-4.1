import express from "express";
const router = express.Router();

router.get("", (req, res) => {
  return res.send("pages/not-found");
});

export default router;
