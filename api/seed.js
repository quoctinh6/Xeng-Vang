const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const Category = require("./models/category.model");
const Product = require("./models/product.model");
const User = require("./models/user.model");
const Order = require("./models/order.model");

const dataPath = path.resolve(__dirname, "data", "data.json");

async function seed() {
  try {
    await connectDB();
    const raw = fs.readFileSync(dataPath, "utf8");
    const data = JSON.parse(raw);

    // Categories: clear and insert/replace by code
    const categories = data.category || [];
    for (const c of categories) {
      const filter = { code: c.id || c.code || c.name };
      const update = {
        legacyId: c.id,
        code: c.id || c.code || undefined,
        name: c.name,
      };
      await Category.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true,
      });
    }

    // Products
    const products = data.product || [];
    for (const p of products) {
      const filter = { legacyId: p.id };
      const update = {
        legacyId: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        stock: p.stock ?? p.quantity ?? 0,
        quantity: p.quantity ?? p.stock ?? 0,
        image: p.image,
        description: p.description,
        onSale: p.onSale,
        orderDiscount: p.orderDiscount,
        freeShipping: p.freeShipping,
        rating: p.rating,
        reviews_count: p.reviews_count,
        soldCount: p.soldCount || undefined,
      };
      await Product.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true,
      });
    }

    // Users
    const users = data.user || [];
    for (const u of users) {
      const filter = { email: u.email };
      const update = {
        legacyId: u.id,
        email: u.email,
        password: u.password,
        name: u.name,
        phone: u.phone,
        address: u.address,
        role: u.role || "customer",
      };
      await User.findOneAndUpdate(filter, update, { upsert: true, new: true });
    }

    // Orders
    const orders = data.order || [];
    for (const o of orders) {
      const filter = { legacyId: o.id };
      const update = {
        legacyId: o.id,
        userId: o.userId,
        date: o.date ? new Date(o.date) : undefined,
        status: o.status,
        total: o.total,
        items: o.items || [],
      };
      await Order.findOneAndUpdate(filter, update, { upsert: true, new: true });
    }

    console.log("Seeding finished.");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}
