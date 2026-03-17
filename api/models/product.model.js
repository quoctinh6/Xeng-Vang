const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    // optional legacy id field (string or number)
    legacyId: { type: Schema.Types.Mixed },
    name: { type: String, required: true },
    category: { type: String, index: true }, // store category code like 'chao'
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    image: { type: String },
    description: { type: String },
    onSale: { type: Boolean, default: false },
    orderDiscount: { type: Boolean, default: false },
    freeShipping: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviews_count: { type: Number, default: 0 },
    soldCount: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
