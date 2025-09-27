import express from "express";
import upload from "../middlewares/multer.js";
import { addStudent } from "../controllers/studentController.js";

const router = express.Router();

const fields = [
  { name: "marksheet", maxCount: 1 },
  { name: "tc", maxCount: 1 },
  { name: "migration", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "idProof", maxCount: 1 },
  { name: "paymentReceipt", maxCount: 1 },
];

router.post("/", upload.fields(fields), addStudent);

export default router;
