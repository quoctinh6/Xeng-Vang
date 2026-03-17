const express = require("express");
const router = express.Router();
const { uploadDir, saveFile } = require("../controllers/upload.controller");

// POST handler for base64 encoded file
router.post("/", express.json({ limit: "50mb" }), (req, res) => {
  try {
    const { filename, filedata } = req.body;
    if (!filename || !filedata) {
      return res.status(400).json({ error: "Missing filename or filedata" });
    }

    // Decode base64 and write file
    const buffer = Buffer.from(filedata, "base64");
    const savedName = saveFile(filename, buffer);

    const protocol = req.protocol || "http";
    const host = req.get("host") || "localhost:3000";
    const url = `${protocol}://${host}/img/products/${savedName}`;
    return res.json({ filename: savedName, url });
  } catch (err) {
    console.error("[upload] error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
