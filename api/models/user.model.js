const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    legacyId: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    role: { type: String, default: "customer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
