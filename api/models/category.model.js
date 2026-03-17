const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    legacyId: { type: Schema.Types.Mixed },
    code: { type: String, unique: true, index: true },
    name: { type: String, required: true, unique: true },
    img: { type: String },
    stt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
