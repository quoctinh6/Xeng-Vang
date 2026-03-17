const path = require("path");
const fs = require("fs");

// Ensure upload folder exists
const uploadDir = path.join(
  __dirname,
  "..",
  "..",
  "FE",
  "src",
  "components",
  "img",
  "products"
);
fs.mkdirSync(uploadDir, { recursive: true });

module.exports = {
  uploadDir,
  saveFile: function (filename, buffer) {
    const safeName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const timestamp = Date.now();
    const finalName = `${timestamp}-${safeName}`;
    const filePath = path.join(uploadDir, finalName);
    fs.writeFileSync(filePath, buffer);
    return finalName;
  },
};
