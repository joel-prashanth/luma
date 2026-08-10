import express from "express";

import {
  getDocuments,
  createDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocument,
  uploadDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

import upload from "../middleware/upload.js";

router.get("/", getDocuments);
router.post("/", createDocument);
router.post("/upload", upload.single("file"), uploadDocument);
router.get("/:id", getDocumentById);
router.patch("/:id", updateDocumentById);
router.delete("/:id", deleteDocument);

export default router;
