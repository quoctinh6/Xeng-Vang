const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.Mixed },
    name: String,
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    image: String,
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    legacyId: { type: String },
    userId: { type: Schema.Types.Mixed },
    date: { type: Date },
    status: { type: String, default: "pending" },
    total: { type: Number, default: 0 },
    items: [OrderItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
