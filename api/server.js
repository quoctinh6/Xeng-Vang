const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: path.resolve(__dirname, ".env") });
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// app.use("/api/categories", require("./routes/category.routes"));
// app.use("/api/products", require("./routes/product.routes"));

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const homeRoutes = require("./routes/home.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const uploadRoutes = require("./routes/upload.routes");

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// serve uploaded images from the frontend public img folder so paths like /img/products/xxx work
app.use(
  "/img",
  express.static(path.join(__dirname, "..", "FE", "public", "img"))
);

// upload endpoint for product images
app.use("/api/upload", uploadRoutes);

// also serve images saved inside FE src components img/products
app.use(
  "/img/products",
  express.static(
    path.join(__dirname, "..", "FE", "src", "components", "img", "products")
  )
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`http://localhost:${PORT}/api/home`);
console.log(`http://localhost:${PORT}/api/categories`);
console.log(`http://localhost:${PORT}/api/products`);
console.log(`http://localhost:${PORT}/api/users`);
console.log(`http://localhost:${PORT}/api/orders`);
