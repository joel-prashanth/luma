const express = require("express");

const {
  getDocuments,
  createDocument,
} = require("../controllers/document.controller");

const router = express.Router();

router.get("/", getDocuments);

router.post("/", createDocument);

module.exports = router;